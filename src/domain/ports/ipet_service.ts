import { Pet } from "../entities/pet";

export interface IPetService {
  create(newPet: Pet, ownerId: string): Promise<Pet | undefined>;
  fetchAll(): Promise<Pet[]>;
  findById(pet_id: string): Promise<Pet | undefined>;
  findByIdAndUpdate(pet_id: string, petUpdated: Pet): Promise<Pet | undefined>;
  delete(pet_id: string): Promise<void>;
}
