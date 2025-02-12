/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-sprite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    ext: string;
    menuTitle: string;
    showInNav?: boolean;
  }
}

declare module '*.scss';
declare module '*.png';

export {};
