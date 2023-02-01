import { Hygiene } from "../entities/hygiene";

export interface IHygieneService {
  create(newHygiene: Hygiene, petId: number): Promise<Hygiene | undefined>;
  fetchAll(): Promise<Hygiene[]>;
}
