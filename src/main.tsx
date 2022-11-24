import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme, token } from "./assets/theme";

// redux toolkit：
import { Provider } from "react-redux";
import { store } from "./store";

// polyfill：
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only"; // AbortController 的兼容性不好
// 滚动兼容：
import smoothscroll from "smoothscroll-polyfill";
if (import.meta.env.PROD && import.meta.env.MODE.includes("hm")) {
  smoothscroll.polyfill();
}

dayjs.locale("zh-cn");

const container = document.getElementById("root");

container &&
  ReactDOM.createRoot(container).render(
    <ConfigProvider locale={locale} componentSize="middle" theme={{ token }}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </ConfigProvider>
  );
