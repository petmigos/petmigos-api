import { Hygiene } from "../../entities/hygiene";
import { IHygieneService } from "../../ports/ihygiene_service";


export class Update {
  constructor(private readonly hygieneService: IHygieneService) {}

  async execute(
    pet_string: string,
    hygieneUpdated: Hygiene
  ): Promise<Hygiene | undefined> {
    return this.hygieneService.findByIdAndUpdate(pet_string, hygieneUpdated);
  }
}