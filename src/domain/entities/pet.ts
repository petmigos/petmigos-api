import { GenderEnum } from "./gender_enum";
import { User } from "./user";

export interface Pet {
  _id?: number;
  ownerId: string;
  owner?: User;
  name: string;
  type: string;
  birthday: Date;
  gender: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
