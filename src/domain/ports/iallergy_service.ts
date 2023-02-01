import { Allergy } from "../entities/allergy";

export interface IAllergyService {
  create(newAllergy: Allergy, petId: number): Promise<Allergy | undefined>;
  fetchAll(): Promise<Allergy[]>;
}
