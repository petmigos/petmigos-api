import { Item } from "../../entities/Item";
import { IItemService } from "../../ports/iitems_service";

export class FetchAllByCompany {
  constructor(private readonly registerItemService: IItemService) {}

  async execute(companyId: string): Promise<Item[]> {
    return this.registerItemService.fetchAllByCompany(companyId);
  }
}
