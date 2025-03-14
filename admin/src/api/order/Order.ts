import { Product } from "../product/Product";
import { JsonValue } from "type-fest";
import { User } from "../user/User";

export type Order = {
  createdAt: Date;
  id: string;
  paymentStatus: boolean | null;
  paymentintent: string | null;
  price: number | null;
  products?: Array<Product>;
  status: JsonValue;
  updatedAt: Date;
  user?: User | null;
};
