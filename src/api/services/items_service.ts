import mongoose, { Schema } from "mongoose";
import { Item } from "../../domain/entities/Item";
import { IItemService } from "../../domain/ports/iitems_service";
import cloudinary from 'cloudinary'


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
    }).populate("company");
    if (foundItem === null) return undefined;
    return foundItem;
  }

  async findById(id: string): Promise<Item | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundItem = await ItemModel.findOne({
      _id: id,
    }).populate("company");
    if (foundItem === null) return undefined;
    return foundItem;
  }

  async fetchAllByCompany(companyId: string): Promise<Item[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allItems = await ItemModel.find({ company: companyId }).populate(
      "company"
    );
    return allItems;
  }

  async fetchAll(): Promise<Item[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allItems = await ItemModel.find().populate("company");
    return allItems;
  }

  async delete(id: string): Promise<void> {
    cloudinary.v2.config({
      cloud_name: "petmigosimages",
      api_key: "218227198987731",
      api_secret: "JImGB4Cuw8uN-50fHpt0IwjJwT4"
    });
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const item = ItemModel.findById({ _id: id }).lean().exec();
    let imageId: any = (await item).image;
    imageId = imageId.split("/").pop().split(".")[0];
    console.log(imageId);
    await cloudinary.v2.uploader.destroy(imageId)
    await ItemModel.findByIdAndDelete({ _id: id });
  }

}
