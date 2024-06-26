import {Navbar} from "@nextui-org/react";
import {FunctionComponent} from "react";

export type Props = {
  title: string,
  home: string,
  breadcrumb?: Array<[
    label: string,
    href: string,
    alternatives?: Array<[
      label: string,
      href: string
    ]>
  ]>
};

export default (p => {
  return (
    <Navbar>

    </Navbar>
  );
}) satisfies FunctionComponent<Props>;
