import styled from 'styled-components';
import logos from '@/assets/pngs/飞航LOGO.png'

export const Wrapper = styled.div`
  padding-right: 16px;
  display: flex;
  align-items: center;
  .ant-avatar {
    cursor: pointer;
    border: 1px solid #ccc;
  }
  .logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-image: url(${logos});
    background-size: 100% 100%;
  }
`;
