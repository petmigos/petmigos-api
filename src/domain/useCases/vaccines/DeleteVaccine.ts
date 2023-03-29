import { IVaccineService } from "../../ports/ivaccine_service";

export class DeleteVaccine {
  constructor(private readonly vaccineService: IVaccineService) {}

  async execute(vaccineId: string): Promise<void> {
    this.vaccineService.delete(vaccineId);
  }
}
