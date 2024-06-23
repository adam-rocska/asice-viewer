import {FunctionComponent} from "react";
import FileLoader from "@/features/client-database/file-loader";

export type Props = {
  label: string;
  alternative: string;
};

export default (p => {
  return (
    <>
      <div className="flex flex-col gap-2 align-middle justify-center">
        <FileLoader color="primary" className="mx-auto">
          {p.label}
        </FileLoader>
        <small className='block text-foreground-400 italic text-center'>
          {p.alternative}
        </small>
      </div>
    </>
  );
}) satisfies FunctionComponent<Props>;