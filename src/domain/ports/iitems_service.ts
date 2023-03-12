import { Item } from "../entities/Item";

export interface IItemService {
  create(newItem: Item, companyId: string): Promise<Item | undefined>;
  findById(companyId: string, id: string): Promise<Item | undefined>;
  fetchAllByCompany(companyId: string): Promise<Item[]>;
  fetchAll(): Promise<Item[]>;
}
