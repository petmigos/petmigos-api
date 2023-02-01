import mongoose, { Schema } from "mongoose";
import { Vaccine } from "../../domain/entities/vaccine";
import { IVaccineService } from "../../domain/ports/ivaccine_service";

const VaccinesSchema = new Schema<Vaccine>({
  name: String,
  locale: {
    name: String,
  },
  date: Date,
  applied: Boolean,
  pet: { type: Schema.Types.ObjectId, ref: "Pets" },
});

const VaccineModel = mongoose.model<Vaccine>("Vaccines", VaccinesSchema);

export class VaccineService implements IVaccineService {
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
    newVaccine: Vaccine,
    petId: string
  ): Promise<Vaccine | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdVaccine = await VaccineModel.create({
      ...newVaccine,
      pet: petId,
    });
    return createdVaccine;
  }

  async fetchAll(petId: string): Promise<Vaccine[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) return [];
    const allVaccines = await VaccineModel.find<Vaccine>({
      pet: petId,
    }).populate("pet");
    return allVaccines;
  }
}
