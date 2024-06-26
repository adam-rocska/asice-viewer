"use client";
import {BreadcrumbItem, Breadcrumbs, Navbar, NavbarContent} from "@nextui-org/react";
import {FunctionComponent, ReactNode} from "react";
import Link, {useLinkPropsFactory} from "./link";

export type Props = {
  breadcrumb?: Array<[
    label: string,
    href: string,
    alternatives?: Array<[
      label: string,
      href: string
    ]>
  ]>
  children?: ReactNode
};

export default (({breadcrumb, children}) => {
  const linkProps = useLinkPropsFactory();
  return (
    <Navbar classNames={{base: 'bg-content1/70'}} isBordered isBlurred>
      {breadcrumb && (
        <NavbarContent justify="start">
          <Breadcrumbs>
            {breadcrumb.map(([label, href, alternatives], index) => (
              <BreadcrumbItem key={index}>
                <Link href={href} color="foreground">
                  {label}
                </Link>
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </NavbarContent>
      )}
      {children && (
        <NavbarContent justify="end">
          {children}
        </NavbarContent>
      )}
    </Navbar>
  );
}) satisfies FunctionComponent<Props>;
