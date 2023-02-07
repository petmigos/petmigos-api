import { Hygiene } from "../../entities/hygiene";
import { IHygieneService } from "../../ports/ihygiene_service";

export class FindAll {
  constructor(private readonly hygieneService: IHygieneService) {}

  async execute(petId: string): Promise<Hygiene[]> {
    return this.hygieneService.fetchAll(petId);
  }
}
