import { GenderEnum } from "./gender_enum";

export interface Pet {
  _id?: number;
  name: string;
  type: string;
  birthday: Date;
  gender: GenderEnum;
  tags: string[];
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
