import { Item } from "../../entities/Item";
import { IItemService } from "../../ports/iitems_service";

export class Create {
  constructor(private readonly registerItemService: IItemService) {}

  async execute(newItem: Item, companyId: string): Promise<Item | undefined> {
    return this.registerItemService.create(newItem, companyId);
  }
}
