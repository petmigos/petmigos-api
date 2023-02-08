import { Pet } from "./pet";

export interface Hygiene {
  _id?: string;
  category: string;
  description: string;
  date: Date;
  pet?: Pet;
  createdAt: Date;
  updatedAt: Date;
}
