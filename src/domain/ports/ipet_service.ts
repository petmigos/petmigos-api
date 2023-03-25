import { Pet } from "../entities/pet";

export interface IPetService {
  create(newPet: Pet, ownerId: string): Promise<Pet | undefined>;
  fetchAll(): Promise<Pet[]>;
}
