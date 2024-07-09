import {useLiveQuery} from "dexie-react-hooks";
import {useAsyncList} from "react-stately";
import fileStorage from "@/db/asice-storage";
import {useEffect} from "react";

export default function useFileList() {
  const archives = useLiveQuery(() => fileStorage.archives.toArray(), [], []);
  const list = useAsyncList<File>({
    getKey: file => file.name,
    load: async () => ({
      items: await Promise.all(archives.map(async archive => new File(
        [archive.arrayBuffer],
        archive.name,
        {lastModified: archive.lastModified, type: archive.type}
      )))
    }),
    sort: async ({items, sortDescriptor}) => ({
      items: items.sort((lhs, rhs) => {
        const column = sortDescriptor.column as keyof File;
        const order = sortDescriptor.direction === "ascending" ? 1 : -1;
        switch (column) {
          case "lastModified": return order * (lhs[column] - rhs[column]);
          case "name": return order * lhs[column].localeCompare(rhs[column]);
          case "size": return order * (lhs[column] - rhs[column]);
          default: return 0;
        }
      })
    })
  });

  useEffect(() => {
    list.reload();
  }, [archives]);

  return list;
}