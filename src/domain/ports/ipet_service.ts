import { Pet } from "../entities/pet";

export interface IPetService {
  create(newPet: Pet): Promise<Pet | undefined>;
  fetchAll(): Promise<Pet[]>;
  findById(pet_id: string): Promise<Pet | undefined>;
}
