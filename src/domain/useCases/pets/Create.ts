import { Pet } from "../../entities/pet";
import { IPetService } from "../../ports/ipet_service";

export class Create {
  constructor(private readonly petService: IPetService) {}

  async execute(newPet: Pet, ownerId: string): Promise<Pet | undefined> {
    return this.petService.create(newPet, ownerId);
  }
}
