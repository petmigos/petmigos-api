import { Allergy } from "../../entities/allergy";
import { IAllergyService } from "../../ports/iallergy_service";

export class Update {
  constructor(private readonly allergyService: IAllergyService) {}

  async execute(
    pet_string: string,
    allergyUpdated: Allergy
  ): Promise<Allergy | undefined> {
    return this.allergyService.findByIdAndUpdate(pet_string, allergyUpdated);
  }
}