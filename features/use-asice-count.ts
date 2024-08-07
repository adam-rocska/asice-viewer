"use client";
import fileStorage from "@/db/asice-storage";
import {useLiveQuery} from "dexie-react-hooks";

export function useFileCount(): number {
  const fileCount = useLiveQuery(() => fileStorage.archives.count(), [], 0);
  return fileCount;
}