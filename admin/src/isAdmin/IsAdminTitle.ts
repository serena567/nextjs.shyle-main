import { IsAdmin as TIsAdmin } from "../api/isAdmin/IsAdmin";

export const ISADMIN_TITLE_FIELD = "id";

export const IsAdminTitle = (record: TIsAdmin): string => {
  return record.id?.toString() || String(record.id);
};
