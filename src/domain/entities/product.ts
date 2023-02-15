import { Company } from "./Company";
import { ProductCategoryEnum } from "./product_category_enum";

export interface Product {
  _id?: string;
  name: string;
  unitPrice: number;
  imageURL: string;
  description: string;
  category: ProductCategoryEnum;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
}
