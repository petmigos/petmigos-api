import { RiskEnum } from "./risk_enum";

export interface Allergy {
  id?: number;
  name: string;
  risk: RiskEnum;
  createdAt: Date;
  updatedAt: Date;
}
