import { APP_NAME } from '@/constants';
import { uniqMessage } from '@/utils';
import { useNetwork, useTitle } from 'ahooks';
import { useEffect } from 'react';

export const useAppTitle = (label: string) => {
  const title = label ? `${APP_NAME} - ${label}` : APP_NAME;
  useTitle(title);
};

export const useAppConfiguration = () => {
  const netWork = useNetwork();

  useEffect(() => {
    if (!netWork.online) {
      console.log(`当前环境：${import.meta.env.MODE}`);

      uniqMessage('warning', '无法连接到网络，请检查后再试');
      console.error(netWork);
    }
  }, [netWork.online]);
};
