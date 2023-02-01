import { Vaccine } from "../entities/vaccine";

export interface IVaccineService {
  create(newVaccine: Vaccine, petId: number): Promise<Vaccine | undefined>;
  fetchAll(): Promise<Vaccine[]>;
}
