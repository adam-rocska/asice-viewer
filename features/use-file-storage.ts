"use client";
import {useMemo} from "react";
import {useLocalStorage} from "usehooks-ts";

export default function useFileStorage(): FileCollectionHook;
export default function useFileStorage(fileName: string): SingleFileHook;
export default function useFileStorage(fileName?: string): SingleFileHook | FileCollectionHook {
  const [archives, setArchives] = useLocalStorage<FileStorage>("archives", {});
  const files = useMemo(() => Object
    .fromEntries(
      Object
        .entries(archives)
        .map(([name, archive]) => [
          name,
          new File([archive.text], archive.name, {lastModified: archive.lastModified, type: archive.type})
        ])
    ),
    [archives]
  );
  const file = useMemo(() => {
    if (fileName === undefined) return undefined;
    return files[fileName];
  }, [files, fileName]);

  const putFile = async (file: File, ...otherFiles: File[]) => {
    const files = [file, ...otherFiles];
    const archives = await Promise
      .all(
        files.map(async file => ({
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          text: await file.text(),
        }))
      );
    const newArchives = Object.fromEntries(archives.map(archive => [archive.name, archive]));
    setArchives(archives => ({...archives, ...newArchives}));
  };

  const removeFile = async (file: File, ...otherFiles: File[]) => {
    setArchives(archives => {
      const newArchives = {...archives};
      for (const otherFile of [file, ...otherFiles]) delete newArchives[otherFile.name];
      return newArchives;
    });
  };

  return arguments.length === 0
    ? {files, putFile, removeFile}
    : {file, putFile, removeFile};
};

export type FileStorage = {[name in string]: Archive;};

export type FileCollectionHook = {
  files: {[name in string]: File;},
  putFile: (...files: File[]) => Promise<void>,
  removeFile: (...files: File[]) => Promise<void>
};


export type SingleFileHook = {
  file: File | undefined,
  putFile: (file: File) => Promise<void>,
  removeFile: (file: File) => Promise<void>
};

type Archive = {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  text: string;
};
