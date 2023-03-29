import { Hygiene } from "../entities/hygiene";

export interface IHygieneService {
  create(newHygiene: Hygiene, petId: string): Promise<Hygiene | undefined>;
  fetchAll(petId: string): Promise<Hygiene[]>;
  delete(hygieneId: string): Promise<void>;
  findByIdAndUpdate(
    hygieneId: string,
    updatedHygiene: Hygiene
  ): Promise<Hygiene | undefined>;
}
