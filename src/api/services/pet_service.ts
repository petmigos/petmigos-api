import mongoose from "mongoose";
import { GenderEnum } from "../../domain/entities/gender_enum";
import { Pet } from "../../domain/entities/pet";
import { IPetService } from "../../domain/ports/ipet_service";

const PetSchema = new mongoose.Schema<Pet>(
  {
    name: String,
    type: String,
    birthday: Date,
    gender: {
      type: String,
      default: GenderEnum.MALE,
      enum: Object.values(GenderEnum),
    },
    tags: [String],
    imageURL: String,
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

  async create(newPet: Pet): Promise<Pet | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdPet = await PetModel.create(newPet);
    return createdPet;
  }

  async fetchAll(): Promise<Pet[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) return [];
    const allPets = await PetModel.find<Pet>({});
    return allPets;
  }
}
