import BG from "@/assets/pngs/BG.png";
import BG1 from "@/assets/pngs/BG1.png";
import shadowBG from "@/assets/pngs/投影.png";
import styled from "styled-components";

export const LoginWapper = styled.div`
  .the-login-page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: #f0f0f0;
    background-image: url(${BG});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: #586982;
    .login_module {
      width: 1340px;
      height: 600px;
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      .common {
        width: 670px;
        height: 100%;
      }
      .left_img {
        vertical-align: top;
        background-image: url(${BG1});
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .right_login {
        box-sizing: border-box;
        padding: 100px 100px 0 100px;
        padding-left: 100px;
        background-color: white;
        .login-pane {
          background-color: white;
          .login-pane-inside-box {
            margin: auto;
            min-width: 300px;
            text-align: left;
            .forms {
              margin-top: 33px;
            }
            .the-title {
              font-size: 32px;
              height: 40px;
              line-height: 40px;
              font-weight: 500;
              color: #222653;
            }
            .sub_title {
              margin-top: 8px;
              font-size: 16px;
              color: #8789a0;
              height: 24px;
              line-height: 24px;
              margin-bottom: 10px;
            }
            .ant-form-item-required {
              color: #586982;
              height: 24px;
              line-height: 24px;
              font-size: 16px;
            }
            .input {
              border-radius: 4px;
              border: 1px solid #cacbd6;
              width: 460px;
              height: 54px;
            }
            .ant-input-affix-wrapper {
              height: 54px;
            }
            .ant-input {
              font-size: 16px;
            }
            .remember-account {
              .ant-form-item-control-input-content {
                display: flex;
                justify-content: space-between;
              }
            }
            button {
              width: 50%;
              margin-bottom: 20px;
            }
          }
        }
      }
    }
    .shadow {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%);
      width: 1460px;
      height: 323px;
      background: url(${shadowBG});
      background-repeat: no-repeat;
      background-size: 100% 100%;
      /* opacity: .8; */
    }

    .copyright {
      position: absolute;
      bottom: 5%;
      left: 0;
      right: 0;
      text-align: center;
      color: #786c6c;
      font-size: 16px;
    }
    .inside-box {
      width: 25vw;
      height: 65vh;
      min-width: 400px;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 70%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .img-pane,
      .login-pane {
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: 0.2s;
        -webkit-transition: 0.2s;
        opacity: 1;
        display: flex;
      }
      .img-pane {
        background-color: #0080ff;
        color: white;
        font-size: 12px;
        text-align: center;
        & > div {
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          .the-pane-img {
            width: 100%;
            display: block;
          }
          .the-slogan {
            font-size: 24px;
            font-weight: bolder;
            margin: 20px 0;
            display: flex;
            align-items: center;
          }
        }
      }
      .login-pane {
        background-color: white;
        .login-pane-inside-box {
          margin: auto;
          min-width: 300px;
          text-align: center;
          .the-form-item {
            text-align: left;
          }
          .remember-account {
            text-align: left;
            margin-bottom: 40px;
          }
          button {
            width: 240px;
            height: 54px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1100px) {
    .login-pane {
      width: 100% !important;
    }
    .img-pane {
      opacity: 0 !important;
      width: 0 !important;
    }
  }
`;
