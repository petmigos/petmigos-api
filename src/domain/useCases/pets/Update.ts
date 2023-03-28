import { Pet } from "../../entities/pet";
import { IPetService } from "../../ports/ipet_service";

export class Update {
  constructor(private readonly petService: IPetService) {}

  async execute(pet_string: string, petUpdated: Pet): Promise<Pet | undefined> {
    return this.petService.findByIdAndUpdate(pet_string, petUpdated);
  }
}