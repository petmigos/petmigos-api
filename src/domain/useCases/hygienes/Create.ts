import { Hygiene } from "../../entities/hygiene";
import { IHygieneService } from "../../ports/ihygiene_service";

export class Create {
  constructor(private readonly hygieneService: IHygieneService) {}

  async execute(
    newHygiene: Hygiene,
    petId: string
  ): Promise<Hygiene | undefined> {
    return this.hygieneService.create(newHygiene, petId);
  }
}
