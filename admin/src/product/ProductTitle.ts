import { Product as TProduct } from "../api/product/Product";

export const PRODUCT_TITLE_FIELD = "tittle";

export const ProductTitle = (record: TProduct): string => {
  return record.tittle?.toString() || String(record.id);
};
