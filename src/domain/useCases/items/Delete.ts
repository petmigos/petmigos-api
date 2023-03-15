import { IItemService } from "../../ports/iitems_service";

export class Delete {
  constructor(private readonly registerItemService: IItemService) {}

  async execute(id: string): Promise<void> {
     this.registerItemService.delete(id);
  }
}