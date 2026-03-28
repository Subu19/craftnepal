/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API: string;
  readonly VITE_APP_LOGIN: string;
  readonly VITE_APP_CHECK_AUTH: string;
  readonly VITE_APP_AVATAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
