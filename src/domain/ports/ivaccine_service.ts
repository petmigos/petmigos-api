import { promises } from "dns";
import { Vaccine } from "../entities/vaccine";

export interface IVaccineService {
  create(newVaccine: Vaccine, petId: string): Promise<Vaccine | undefined>;
  fetchAll(petId: string): Promise<Vaccine[]>;
  delete(vaccineId: string): Promise<void>;
  findByIdAndUpdate(
    vaccineId: string,
    updatedVaccine: Vaccine
  ): Promise<Vaccine | undefined>;
}
