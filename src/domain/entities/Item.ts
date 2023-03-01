import { Company } from "./company";

export interface Item {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
}
