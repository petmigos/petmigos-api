import { Locale } from "./locale";

export interface Vaccine {
  id?: number;
  name: string;
  locale: Locale;
  applied: boolean;
  createdAt: Date;
  updatedAt: Date;
}
