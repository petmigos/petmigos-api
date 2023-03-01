import mongoose, { Schema } from "mongoose";
import { Item } from "../../domain/entities/Item";
import { IItemService } from "../../domain/ports/iitems_service";

const ItemSchema = new mongoose.Schema<Item>(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    company: { type: Schema.Types.ObjectId, ref: "Companies" },
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

  async findById(companyId: string, id: string): Promise<Item | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundItem = await ItemModel.findOne({ company: companyId, _id: id });
    if (foundItem === null) return undefined;
    return foundItem;
  }

  async fetchAll(companyId: string): Promise<Item[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allItems = await ItemModel.find({ company: companyId });
    return allItems;
  }
}
