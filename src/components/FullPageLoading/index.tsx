import MyLoading from '@/baseCpns/MyLoading';
import React, { memo } from 'react';
import styled from 'styled-components';

interface IPropsType {
  loading?: boolean;
}

const FullPageLoading: React.FC<IPropsType> = ({ loading = true }) => (
  <>
    {loading && (
      <Wrapper>
        <MyLoading />
      </Wrapper>
    )}
  </>
);

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 666;
`;

export default memo(FullPageLoading);
