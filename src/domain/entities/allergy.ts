import { Pet } from "./pet";
import { RiskEnum } from "./risk_enum";

export interface Allergy {
  _id?: string;
  name: string;
  risk: RiskEnum;
  pet?: Pet;
  createdAt: Date;
  updatedAt: Date;
}
