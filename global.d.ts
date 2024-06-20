declare module '*.svg' {
  import {FunctionComponent, SVGProps} from 'react';
  const content: FunctionComponent<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: any;
  export default content;
}