import { Item } from "../entities/Item";

export interface IItemService {
    create(newItem: Item): Promise<Item | undefined>;
}