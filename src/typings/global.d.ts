/// <reference types="vite/client" />

declare module "smoothscroll-polyfill";

interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_COMPANY: string;
  readonly VITE_WORKSHOP: number;
  readonly VITE_PROXY_APS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string;
declare const __WORKSHOP__: boolean;
declare const __ISDEV__: boolean;

declare type AnyObject = Record<any, any>;

declare interface IResponse<Data = any> {
  data: Data;
  readonly code: number;
  readonly success: boolean;
  readonly msg?: string;
  readonly message?: string;
}
