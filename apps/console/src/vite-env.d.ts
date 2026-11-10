/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Aegis Relay core service. Defaults to the local service. */
  readonly VITE_AEGIS_RELAY_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
