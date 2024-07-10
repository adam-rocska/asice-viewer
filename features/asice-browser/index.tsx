"use client";
import {Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner} from "@nextui-org/react";
import {useTranslations} from "next-intl";
import {FunctionComponent, useEffect, useState} from "react";
import {ZipArchive, ZipEntry} from "@shortercode/webzip";
import Entry from "./entry";
import clsx from "clsx";
import TrashCan from "@/icons/trash-can.svg";
import ChevronDown from "@/icons/chevron-down.svg";

export type Props = {
  file?: File
};

export default (({file}) => {
  const [archive, setArchive] = useState<ZipArchive>();
  const t = useTranslations();
  useEffect(() => {
    if (!file) return;
    ZipArchive
      .from_blob(file)
      .then(setArchive);
  }, [file]);

  if (!file) return null;
  return (
    <Modal
      backdrop="blur"
      isOpen
      size="5xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {file?.name}
            </ModalHeader>
            <ModalBody className="flex flex-row flex-wrap gap-4">
              {
                archive
                  ? Array
                    .from({[Symbol.iterator]: () => archive.files()})
                    .map(([name, entry], i) => (
                      <Entry
                        key={`${name}-${i}`}
                        archive={archive}
                        name={name}
                        entry={entry}
                        classNames={{
                          base: clsx("w-1/12")
                        }}
                      />
                    ))
                  : <Spinner label="Default" color="default" labelColor="foreground" />
              }
            </ModalBody>
            <ModalFooter>
              <Button variant="light">
                Close
              </Button>
              <ButtonGroup color="primary" variant="flat">
                <Button onPress={onClose}>
                  Download
                </Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      endContent={<TrashCan className='size-4' />}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}) satisfies FunctionComponent<Props>;