import { Database as DB } from "./lib/database.types";

export type userData = Database["public"]["Tables"]["users"]["Row"];

declare global {
  type Database = DB;
}
