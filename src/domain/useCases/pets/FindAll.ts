import { Pet } from "../../entities/pet";
import { IPetService } from "../../ports/ipet_service";

export class FindAll {
  constructor(private readonly petService: IPetService) {}
  async execute(): Promise<Pet[]> {
    return this.petService.fetchAll();
  }
}
