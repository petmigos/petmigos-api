import { Locale } from "./locale";

export interface Vaccine {
  _id?: string;
  name: string;
  locale: Locale;
  applied: boolean;
  createdAt: Date;
  updatedAt: Date;
}
