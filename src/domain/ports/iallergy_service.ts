import { Allergy } from "../entities/allergy";

export interface IAllergyService {
  create(newAllergy: Allergy, petId: string): Promise<Allergy | undefined>;
  fetchAll(petId: string): Promise<Allergy[]>;
  delete(alergyId: string): Promise<void>;
  findByIdAndUpdate(
    allergyId: string,
    updatedAllergy: Allergy
  ): Promise<Allergy | undefined>;
}
