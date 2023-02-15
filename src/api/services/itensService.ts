import mongoose from "mongoose";
import { Item } from "../../domain/entities/Item";
import { IItemService} from "../../domain/ports/iitensService";

const ItemSchema = new mongoose.Schema<Item>(
    {
        title: String,
        description: String,
        price: Number,
        category: String,
        image: String
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

      async create(newItem: Item): Promise<Item | undefined> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const createdItem = await ItemModel.create(newItem);
        return createdItem;
    }
    
}