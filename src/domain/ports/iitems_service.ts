import { Item } from "../entities/Item";

export interface IItemService {
  create(newItem: Item, companyId: string): Promise<Item | undefined>;
  findByIdAndCompany(companyId: string, id: string): Promise<Item | undefined>;
  fetchAllByCompany(companyId: string): Promise<Item[]>;
  fetchAll(): Promise<Item[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Item | undefined>;
}
