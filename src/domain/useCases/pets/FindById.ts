import { Pet } from "../../entities/pet";
import { IPetService } from "../../ports/ipet_service";

export class FindById {
  constructor(private readonly petService: IPetService) {}
  async execute(pet_id: string): Promise<Pet | undefined> {
    const foundPet = await this.petService.findById(pet_id);
    if (!foundPet) throw new Error("Pet not found");
    return foundPet;
  }
}
