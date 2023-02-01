import { Vaccine } from "../entities/vaccine";

export interface IVaccineService {
  create(newVaccine: Vaccine, petId: string): Promise<Vaccine | undefined>;
  fetchAll(petId: string): Promise<Vaccine[]>;
}
