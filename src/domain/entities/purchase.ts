import { Item } from "./Item";

export enum PurchaseStatusEnum {
  PENDING = "Pendente",
  PAID = "Pago",
  CANCELED = "Cancelado",
}

export interface PurchaseInfo {
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Purchase extends PurchaseInfo {
  _id?: string;
  transactionCode: string;
  status: PurchaseStatusEnum;
  item?: Item;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseResponse {
  _id: string;
  url: string;
}
