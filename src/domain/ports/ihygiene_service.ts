import { Hygiene } from "../entities/hygiene";

export interface IHygieneService {
  create(newHygiene: Hygiene, petId: string): Promise<Hygiene | undefined>;
  fetchAll(petId: string): Promise<Hygiene[]>;
}
