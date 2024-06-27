"use client";
import {BreadcrumbItem, Breadcrumbs, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent} from "@nextui-org/react";
import {FunctionComponent, ReactNode} from "react";
import Link, {useLinkPropsFactory} from "./link";

export type Props = {
  breadcrumb?: Array<[
    label: ReactNode,
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
                {
                  alternatives && alternatives.length > 0
                    ? (
                      <Dropdown>
                        <DropdownTrigger>
                          <Link color="foreground">
                            {label}
                          </Link>
                        </DropdownTrigger>
                        <DropdownMenu selectionMode="single" selectedKeys={new Set([href])}>
                          {alternatives.map(([label, href]) => (
                            <DropdownItem key={href} {...linkProps({href})}>
                              {label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    )
                    : (
                      <Link href={href} color="foreground">
                        {label}
                      </Link>
                    )
                }
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
