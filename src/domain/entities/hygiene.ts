import { HygieneCategory } from "./hygiene_category";

export interface Hygiene {
  id?: number;
  category: HygieneCategory;
  description: string;
  createdAt: Date;
  updateddAt: Date;
}
