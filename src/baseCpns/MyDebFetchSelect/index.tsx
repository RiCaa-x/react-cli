import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import React, { useMemo, useRef, useState } from 'react';

interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<string | ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}
function DebounceSelect<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  // 首次聚焦就拿一次数据：
  const firstFocusFetch = () => {
    fetchRef.current === 0 && debounceFetcher('');
  };

  return (
    <Select
      filterOption={false}
      showSearch={true}
      onSearch={debounceFetcher}
      onFocus={firstFocusFetch}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;
