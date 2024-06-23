"use client";
import {Button, ButtonProps, Modal, ModalBody, ModalContent} from "@nextui-org/react";
import clsx from "clsx";
import {FunctionComponent, useRef} from "react";
import Dropzone, {DropzoneOptions} from "react-dropzone";
import PaperPlus from "@/icons/paper-plus.svg";
import {useTranslations} from "next-intl";
import {createPortal} from "react-dom";
import {useEventListener} from "usehooks-ts";
import useBooleanState from "@/lib/use-boolean-state";

export default (p => {
  const body = useRef(global?.document?.body);
  const showDropzone = useBooleanState(false);
  useEventListener('dragenter', showDropzone.set, body);
  const t = useTranslations();
  const dropzoneProps: DropzoneOptions = {
    onDragEnter: showDropzone.set,
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      showDropzone.unset();
    },
    /// TODO: double check: https://www.id.ee/en/article/bdoc2-1-new-estonian-digital-signature-standard-format/
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
        {({getRootProps, getInputProps, open}) => (
          <Modal
            isOpen={showDropzone.isEnabled}
            onClose={showDropzone.unset}
            backdrop="blur"
          >
            <ModalContent>
              <ModalBody {...getRootProps({
                className: clsx(
                  "flex flex-col items-center justify-center pt-5 pb-6",
                  "text-slate-400 dark:text-slate-500 ",
                )
              })}>
                <PaperPlus width={64} height={64} />
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