"use client";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner} from "@nextui-org/react";
import {useTranslations} from "next-intl";
import {FunctionComponent, useEffect, useState} from "react";
import {ZipArchive} from "@shortercode/webzip";

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
            <ModalBody>
              {
                archive
                  ? Array
                    .from({[Symbol.iterator]: () => archive?.files()})
                    .map(([name, entry]) => (
                      <p key={name}>
                        {name}
                      </p>
                    ))
                  : <Spinner label="Default" color="default" labelColor="foreground" />
              }
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam pulvinar risus non risus hendrerit venenatis.
                Pellentesque sit amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam pulvinar risus non risus hendrerit venenatis.
                Pellentesque sit amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}) satisfies FunctionComponent<Props>;