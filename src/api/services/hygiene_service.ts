import mongoose, { Schema } from "mongoose";
import { Hygiene } from "../../domain/entities/hygiene";
import { IHygieneService } from "../../domain/ports/ihygiene_service";

const HygienesSchema = new Schema<Hygiene>({
  category: String,
  description: String,
  date: Date,
  pet: { type: Schema.Types.ObjectId, ref: "Pets" },
});

const HygieneModel = mongoose.model<Hygiene>("Hygienes", HygienesSchema);

export class HygieneService implements IHygieneService {
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

  async create(
    newHygiene: Hygiene,
    petId: string
  ): Promise<Hygiene | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdHygiene = await HygieneModel.create({
      ...newHygiene,
      pet: petId,
    });
    return createdHygiene;
  }

  async fetchAll(petId: string): Promise<Hygiene[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) return [];
    const allHygienes = await HygieneModel.find<Hygiene>({
      pet: petId,
    }).populate("pet");
    return allHygienes;
  }

  async findByIdAndUpdate(
    hygieneId: string,
    updatedHygiene: Hygiene
  ): Promise<Hygiene | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const hygieneUpdated = await HygieneModel.findByIdAndUpdate(hygieneId, {
      ...updatedHygiene,
    });
    if (hygieneUpdated == null) return undefined;
    return hygieneUpdated;
  }

  async delete(hygieneId: string): Promise<void> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    await HygieneModel.findByIdAndDelete({ _id: hygieneId });
  }
}
