"use client";
import {useMemo} from "react";
import fileStorage from "@/db/file-storage";
import {useLiveQuery} from 'dexie-react-hooks';

// This crap is good enough. Desktops have the horsepower for it, and I'd be surprised if mobile users would have boatloads of files managed on their phone in a website.

export default function useFileStorage(): FileCollectionHook;
export default function useFileStorage(fileName: string): SingleFileHook;
export default function useFileStorage(fileName?: string): SingleFileHook | FileCollectionHook {
  const archives = useLiveQuery(() => fileStorage.archives.toArray(), [], []);
  const files = useMemo(() => archives
    .map(archive => new File(
      [archive.arrayBuffer],
      archive.name,
      {lastModified: archive.lastModified, type: archive.type}
    )),
    [archives]
  );
  const file = useMemo(() => {
    if (fileName === undefined) return undefined;
    return files.find(file => file.name === fileName);
  }, [files, fileName]);

  const putFile = async (file: File, ...otherFiles: File[]) => {
    await Promise
      .all(
        [file, ...otherFiles]
          .map(async file => await fileStorage.archives.add({
            lastModified: file.lastModified,
            name: file.name,
            size: file.size,
            type: file.type,
            arrayBuffer: await file.arrayBuffer(),
          }))
      );
  };

  const removeFile = async (file: File, ...otherFiles: File[]) => {
    await Promise
      .all(
        archives
          .map(archive => archive.name)
          .filter(name => [file, ...otherFiles].map(file => file.name).includes(name))
          .map(name => fileStorage.archives.delete(name))
      );
  };
  ;

  return arguments.length === 0
    ? {files, putFile, removeFile}
    : {file, putFile, removeFile};
};

export type FileCollectionHook = {
  files: File[],
  putFile: (...files: File[]) => Promise<void>,
  removeFile: (...files: File[]) => Promise<void>
};


export type SingleFileHook = {
  file: File | undefined,
  putFile: (file: File) => Promise<void>,
  removeFile: (file: File) => Promise<void>
};
