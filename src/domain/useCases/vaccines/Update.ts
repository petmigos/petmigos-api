import { Vaccine } from "../../entities/vaccine";
import { IVaccineService } from "../../ports/ivaccine_service";

export class Update {
  constructor(private readonly vaccineService: IVaccineService) {}

  async execute(pet_string: string, vaccineUpdated: Vaccine): Promise<Vaccine | undefined> {
    return this.vaccineService.findByIdAndUpdate(pet_string, vaccineUpdated);
  }
}