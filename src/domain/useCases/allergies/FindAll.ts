import { Allergy } from "../../entities/allergy";
import { IAllergyService } from "../../ports/iallergy_service";

export class FindAll {
  constructor(private readonly allergyService: IAllergyService) {}

  async execute(petId: string): Promise<Allergy[]> {
    return this.allergyService.fetchAll(petId);
  }
}
