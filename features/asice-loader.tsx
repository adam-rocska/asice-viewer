"use client";
import {Button, ButtonProps, Modal, ModalBody, ModalContent} from "@nextui-org/react";
import clsx from "clsx";
import {FunctionComponent, useRef} from "react";
import Dropzone, {DropzoneOptions} from "react-dropzone";
import PaperPlus from "@/icons/paper-plus.svg";
import {useTranslations} from "next-intl";
import {useEventListener} from "usehooks-ts";
import useBooleanState from "@/lib/use-boolean-state";
import useFileStorage from "./use-asice-storage";

export default (p => {
  const body = useRef(global?.document?.body);
  const showDropzone = useBooleanState(false);
  useEventListener('dragenter', showDropzone.set, body);
  const {putFile} = useFileStorage();
  const t = useTranslations();

  const dropzoneProps: DropzoneOptions = {
    onDragEnter: showDropzone.set,
    onDrop: async acceptedFiles => {
      await putFile(...acceptedFiles);
      showDropzone.unset();
    },
    accept: {'application/vnd.etsi.asic-e+zip': ['.asice', '.sce', '.bdoc']}
  };

  return (
    <>
      <Dropzone {...dropzoneProps}>
        {({getRootProps, getInputProps, open}) => (
          <>
            <Button {...getRootProps(p)} onPress={open} />
            <input {...getInputProps()} />
          </>
        )}
      </Dropzone>
      <Dropzone {...dropzoneProps}>
        {({getRootProps, getInputProps}) => (
          <Modal
            isOpen={showDropzone.isEnabled}
            onClose={showDropzone.unset}
            backdrop="blur"
          >
            <ModalContent>
              <ModalBody {...getRootProps({
                className: clsx(
                  "flex flex-col items-center justify-center pt-5 pb-6"
                )
              })}>
                <PaperPlus className="size-6" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  {t('features.clientDatabase.fileLoader.dropzoneLabel')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('features.clientDatabase.fileLoader.supportedExtensions', {
                    fileExtensions: '.asice'
                  })}
                </p>
                <input {...getInputProps()} />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Dropzone>
    </>
  );
}) satisfies FunctionComponent<ButtonProps>;