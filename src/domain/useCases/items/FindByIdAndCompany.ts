import { Item } from "../../entities/Item";
import { IItemService } from "../../ports/iitems_service";

export class FindByIdAndCompany {
  constructor(private readonly registerItemService: IItemService) {}

  async execute(companyId: string, id: string): Promise<Item | undefined> {
    const foundItem = await this.registerItemService.findByIdAndCompany(companyId, id);
    if (!foundItem) throw new Error("Item not found");
    return foundItem;
  }
}
