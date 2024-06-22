import {FunctionComponent, PropsWithChildren} from "react";
import {Button, Spacer} from "@nextui-org/react";

export type Props = {
  label: string;
  alternative: string;
};

export default (p => {
  return (
    <>
      <div className="flex flex-col gap-2 align-middle justify-center">
        <Button color="primary" className="mx-auto">
          {p.label}
        </Button>
        <small className='block text-foreground-400 italic text-center'>
          {p.alternative}
        </small>
      </div>
    </>
  );
}) satisfies FunctionComponent<Props>;