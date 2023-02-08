import { Allergy } from "../../entities/allergy";
import { IAllergyService } from "../../ports/iallergy_service";

export class Create {
  constructor(private readonly allergyService: IAllergyService) {}

  async execute(
    newAllergy: Allergy,
    petId: string
  ): Promise<Allergy | undefined> {
    return this.allergyService.create(newAllergy, petId);
  }
}
