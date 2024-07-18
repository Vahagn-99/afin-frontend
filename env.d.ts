interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // add other environment variables here
    readonly BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}