/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_PORT: number
  readonly VITE_UPLOAD_TARGET: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}