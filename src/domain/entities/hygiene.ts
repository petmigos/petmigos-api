import { HygieneCategory } from "./hygiene_category";

export interface Hygiene {
  _id?: string;
  category: HygieneCategory;
  description: string;
  createdAt: Date;
  updateddAt: Date;
}
