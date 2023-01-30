import { Allergy } from "./allergy";
import { GenderEnum } from "./gender_enum";
import { Hygiene } from "./hygiene";
import { PetType } from "./pet_type";
import { Tag } from "./tag";
import { Vaccine } from "./vaccine";

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  birthday: Date;
  gender: GenderEnum;
  tags: Tag[];
  vaccines: Vaccine[];
  allergies: Allergy[];
  hygienes: Hygiene[];
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
