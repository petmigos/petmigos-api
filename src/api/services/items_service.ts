import mongoose, { Schema } from "mongoose";
import { Item } from "../../domain/entities/Item";
import { IItemService } from "../../domain/ports/iitems_service";

const ItemSchema = new mongoose.Schema<Item>(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    quantity: Number,
    image: String,
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model<Item>("Item", ItemSchema);

export class ItemService implements IItemService {
  private async connect(dbURL?: string): Promise<boolean> {
    if (!dbURL) return false;
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(dbURL);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async create(newItem: Item, companyId: string): Promise<Item | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdItem = await ItemModel.create({
      ...newItem,
      company: companyId,
    });
    return createdItem;
  }

  async findByIdAndCompany(companyId: string, id: string): Promise<Item | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundItem = await ItemModel.findOne({
      company: companyId,
      _id: id,
    });
    if (foundItem === null) return undefined;
    return foundItem;
  }

  async findById(id: string): Promise<Item | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundItem = await ItemModel.findOne({
      _id: id,
    });
    if (foundItem === null) return undefined;
    return foundItem;
  }

  async fetchAllByCompany(companyId: string): Promise<Item[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allItems = await ItemModel.find({ company: companyId });
    return allItems;
  }

  async fetchAll(): Promise<Item[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allItems = await ItemModel.find();
    return allItems;
  }

  async delete(id: string): Promise<void> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    await ItemModel.findByIdAndDelete({ _id: id });
  }
}
