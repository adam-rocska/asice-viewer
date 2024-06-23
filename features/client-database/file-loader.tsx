"use client";
import {Button, ButtonProps} from "@nextui-org/react";
import clsx from "clsx";
import {FunctionComponent, useRef} from "react";
import Dropzone from "react-dropzone";
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

  return (
    <>
      <Dropzone onDrop={acceptedFiles => {
        console.log(acceptedFiles);
        showDropzone.unset();
      }}
        accept={{
          /// TODO: double check: https://www.id.ee/en/article/bdoc2-1-new-estonian-digital-signature-standard-format/
          'application/vnd.etsi.asic-e+zip': ['.asice', '.sce', '.bdoc']
        }}
        onDragEnter={showDropzone.set}
        onDragLeave={showDropzone.unset}
      >
        {({getRootProps, getInputProps}) => (
          <>
            {
              showDropzone.isEnabled && createPortal(
                (
                  <div {...getRootProps()} className={clsx(
                    'bg-slate-950/30 backdrop-blur-md',
                    'fixed top-0 left-0 right-0 bottom-0 z-50 w-screen h-screen',
                    'flex items-center justify-center',
                  )}>
                    <label className={clsx(
                      "bg-slate-50 dark:bg-slate-950 border",
                      "flex flex-col items-center justify-center min-h-64 p-6",
                      "border-2 border-dashed rounded-lg border-slate-400 dark:border-slate-700",
                      "cursor-pointer",
                      "landscape:aspect-paper-A-horizontal portrait:aspect-paper-A-vertical"
                    )}
                    >
                      <div className={clsx(
                        "flex flex-col items-center justify-center pt-5 pb-6",
                        "text-slate-400 dark:text-slate-500 ",
                      )}>
                        <PaperPlus width={64} height={64} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                          {t('features.clientDatabase.fileLoader.dropzoneLabel')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('features.clientDatabase.fileLoader.supportedExtensions', {
                            fileExtensions: '.asice'
                          })}
                        </p>
                      </div>
                      <input {...getInputProps()} />
                    </label>
                  </div>
                ),
                global?.document?.body
              )
            }
          </>
        )}
      </Dropzone>
    </>
  );
}) satisfies FunctionComponent<ButtonProps>;