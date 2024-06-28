declare module '*.svg' {
  import {FC, SVGProps} from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: any;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE: string;
    readonly NEXT_PUBLIC_BASE_PATH: string;
  }
}