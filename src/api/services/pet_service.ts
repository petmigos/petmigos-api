import mongoose, { Schema } from "mongoose";
import { GenderEnum } from "../../domain/entities/gender_enum";
import { Pet } from "../../domain/entities/pet";
import { IPetService } from "../../domain/ports/ipet_service";
import cloudinary from "cloudinary";

const PetSchema = new mongoose.Schema<Pet>(
  {
    name: String,
    type: String,
    birthday: Date,
    gender: String,
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PetModel = mongoose.model<Pet>("Pets", PetSchema);

export class PetService implements IPetService {
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

  async create(newPet: Pet, ownerId: string): Promise<Pet | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdPet = await PetModel.create({
      ...newPet,
      owner: ownerId,
    });
    return createdPet;
  }

  async fetchAll(): Promise<Pet[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) return [];
    const allPets = await PetModel.find<Pet>({});
    return allPets;
  }

  async findById(pet_id: string): Promise<Pet | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundPet = await PetModel.findOne({
      _id: pet_id,
    });
    if (foundPet === null) return undefined;
    return foundPet;
  }

  async findByIdAndUpdate(
    pet_id: string,
    newPet: Pet
  ): Promise<Pet | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const petUpdated = await PetModel.findByIdAndUpdate(pet_id, {
      ...newPet,
    });
    if (petUpdated == null) return undefined;
    return petUpdated;
  }

  async delete(id: string): Promise<void> {
    cloudinary.v2.config({
      cloud_name: "petmigosimages",
      api_key: "218227198987731",
      api_secret: "JImGB4Cuw8uN-50fHpt0IwjJwT4",
    });
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const item = PetModel.findById({ _id: id }).lean().exec();
    let imageId: any = (await item).image;
    imageId = imageId.split("/").pop().split(".")[0];
    console.log(imageId);
    await cloudinary.v2.uploader.destroy(imageId);
    await PetModel.findByIdAndDelete({ _id: id });
  }
}
