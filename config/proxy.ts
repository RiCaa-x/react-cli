import { ServerOptions } from "vite";

export default (env: ImportMetaEnv): ServerOptions["proxy"] => ({
  "/aps_backend": {
    target: env.VITE_PROXY_APS,
    changeOrigin: true
  },
  "/api/standCraft": {
    target: "http://192.168.32.120:8044",
    changeOrigin: true
  }
});
