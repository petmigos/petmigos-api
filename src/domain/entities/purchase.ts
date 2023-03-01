import { Item } from "./Item";
import { User } from "./user";

export enum PaymentTypeEnum {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PIX = "PIX",
}

export enum PurchaseStatusEnum {
  PENDING = "Pendente",
  PAID = "Pago",
  CANCELED = "Cancelado",
}

export interface Payment {
  type: PaymentTypeEnum;
  country: string;
}

export interface Purchase {
  _id?: string;
  quantity: number;
  totalPrice: number;
  status: PurchaseStatusEnum;
  item?: Item;
  user?: User;
  payment?: Payment;
  transactionCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseResponse {
  _id: string;
  url: string;
}
