"client only";
import Dexie, {type EntityTable} from 'dexie';

export const db = new Dexie('FileStorage') as Dexie & {
  archives: EntityTable<Archive, "name">;
};

export type Archive = {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  arrayBuffer: ArrayBuffer;
};

db.version(1).stores({
  archives: 'name'
});

export default db;