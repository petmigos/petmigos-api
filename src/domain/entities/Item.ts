import { Company } from "./company";

export interface Item {
  _id?: string;
  companyId: string;
  company?: Company;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
