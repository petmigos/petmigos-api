import { Vaccine } from "../../entities/vaccine";
import { IVaccineService } from "../../ports/ivaccine_service";

export class Create {
  constructor(private readonly vaccineService: IVaccineService) {}

  async execute(
    newVaccine: Vaccine,
    petId: string
  ): Promise<Vaccine | undefined> {
    return this.vaccineService.create(newVaccine, petId);
  }
}
