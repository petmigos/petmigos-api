import mongoose, { Schema } from "mongoose";
import { Allergy } from "../../domain/entities/allergy";
import { RiskEnum } from "../../domain/entities/risk_enum";
import { IAllergyService } from "../../domain/ports/iallergy_service";

const AllergySchema = new Schema<Allergy>({
  name: String,
  risk: {
    type: String,
    default: RiskEnum.LOW,
    enum: Object.values(RiskEnum),
  },
  pet: { type: Schema.Types.ObjectId, ref: "Pets" },
});

const AllergyModel = mongoose.model<Allergy>("Allergies", AllergySchema);

export class AllergyService implements IAllergyService {
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
    newAllergy: Allergy,
    petId: string
  ): Promise<Allergy | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdAllergy = await AllergyModel.create({
      ...newAllergy,
      pet: petId,
    });
    return createdAllergy;
  }

  async fetchAll(petId: string): Promise<Allergy[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) return [];
    const allAllergies = await AllergyModel.find<Allergy>({
      pet: petId,
    }).populate("pet");
    return allAllergies;
  }

  async findByIdAndUpdate(
    allergyId: string,
    updatedAllergy: Allergy
  ): Promise<Allergy | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allergyUpdated = await AllergyModel.findByIdAndUpdate(allergyId, {
      ...updatedAllergy,
    });
    if (allergyUpdated == null) return undefined;
    return allergyUpdated;
  }

  async delete(allegyid: string): Promise<void> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    await AllergyModel.findByIdAndDelete({ _id: allegyid });
  }
}
