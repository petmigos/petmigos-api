import { Item } from "../../entities/Item";
import { IItemService } from "../../ports/iitensService";

export class RegisterItem {
    constructor(private readonly registerItemService: IItemService) { }

    async execute(newItem: Item): Promise<Item | undefined> {

        const item = newItem;
        
        return this.registerItemService.create(item);
    }
}
