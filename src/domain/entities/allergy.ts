import { RiskEnum } from "./risk_enum";

export interface Allergy {
  _id?: string;
  name: string;
  risk: RiskEnum;
  createdAt: Date;
  updatedAt: Date;
}
