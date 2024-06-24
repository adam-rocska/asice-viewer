import useFileStorage from "@/features/use-file-storage";
import {useAsyncList} from "react-stately";

export default function useFileList() {
  const fileStorage = useFileStorage();
  const list = useAsyncList<File>({
    load: async () => {
      return {items: Object.values(fileStorage.files)};
    },
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

  return list;
}