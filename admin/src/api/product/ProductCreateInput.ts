import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { OrderWhereUniqueInput } from "../order/OrderWhereUniqueInput";
import { ReviewCreateNestedManyWithoutProductsInput } from "./ReviewCreateNestedManyWithoutProductsInput";

export type ProductCreateInput = {
  category?: CategoryWhereUniqueInput | null;
  colors: InputJsonValue;
  description: InputJsonValue;
  discountedPrice: number;
  images: InputJsonValue;
  order?: OrderWhereUniqueInput | null;
  reviews?: ReviewCreateNestedManyWithoutProductsInput;
  tittle: string;
  tittlePrice: number;
  variants: InputJsonValue;
};
