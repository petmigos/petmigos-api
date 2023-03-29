import { IAllergyService } from "../../ports/iallergy_service";

export class DeleteAllergy {
  constructor(private readonly allergyService: IAllergyService) {}

  async execute(allergyId: string): Promise<void> {
    this.allergyService.delete(allergyId);
  }
}
