import { Vaccine } from "../../entities/vaccine";
import { IVaccineService } from "../../ports/ivaccine_service";

export class FindAll {
  constructor(private readonly vaccineService: IVaccineService) {}

  async execute(petId: string): Promise<Vaccine[]> {
    return this.vaccineService.fetchAll(petId);
  }
}
