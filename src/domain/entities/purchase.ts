import { Payment } from "./payment";
import { Product } from "./product";
import { User } from "./user";

export interface Purchase {
  _id?: string;
  user: User;
  product: Product;
  payment: Payment;
  transactionCode: string;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
