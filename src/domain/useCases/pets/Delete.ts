import { IPetService } from "../../ports/ipet_service";

export class Delete {
  constructor(private readonly registerItemService: IPetService) {}

  async execute(id: string): Promise<void> {
    this.registerItemService.delete(id);
  }
}