import { SortOrder } from "../../util/SortOrder";

export type ProductOrderByInput = {
  categoryId?: SortOrder;
  colors?: SortOrder;
  createdAt?: SortOrder;
  description?: SortOrder;
  discountedPrice?: SortOrder;
  id?: SortOrder;
  images?: SortOrder;
  orderId?: SortOrder;
  tittle?: SortOrder;
  tittlePrice?: SortOrder;
  updatedAt?: SortOrder;
  variants?: SortOrder;
};
