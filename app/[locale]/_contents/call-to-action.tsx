"use client";
import {FunctionComponent, useEffect, useState} from "react";
import FileLoader from "@/features/file-loader";
import useFileStorage from "@/features/use-file-storage";
import {Button, Skeleton} from "@nextui-org/react";
import Link from "@/components/link";

export type Props = {
  uploadLabel: string,
  uploadAlternative: string,
  launchLabel: string,
  launchAlternative: string,
};

export default (p => {
  const [hasFiles, setHasFiles] = useState<boolean>();
  const isClient = hasFiles !== undefined;
  const fileStorage = useFileStorage();

  useEffect(() => setHasFiles(
    Object.keys(fileStorage.files).length > 0
  ), [fileStorage.files]);

  return (
    <div className="flex flex-col gap-2 align-middle justify-center">
      <Skeleton isLoaded={isClient} classNames={{
        base: "rounded-lg",
        content: "flex flex-col gap-2 align-middle justify-center"
      }}>
        {
          hasFiles
            ? (
              <Button
                as={Link}
                href="/files"
                color="primary"
                variant="bordered"
                className="mx-auto"
              >
                {p.launchLabel}
              </Button>
            )
            : (
              <FileLoader color="primary" className="mx-auto">
                {p.uploadLabel}
              </FileLoader>
            )
        }
      </Skeleton>
      <Skeleton isLoaded={isClient} classNames={{
        base: "rounded-sm",
        content: "flex flex-col gap-2 align-middle justify-center"
      }}>
        <small className='block text-foreground-400 italic text-center'>
          {hasFiles ? p.launchAlternative : p.uploadAlternative}
        </small>
      </Skeleton>
    </div>
  );
}) satisfies FunctionComponent<Props>;
