import { Item } from "../../entities/Item";
import { IItemService } from "../../ports/iitems_service";

export class FetchAll {
  constructor(private readonly registerItemService: IItemService) {}

  async execute(): Promise<Item[]> {
    return this.registerItemService.fetchAll();
  }
}
