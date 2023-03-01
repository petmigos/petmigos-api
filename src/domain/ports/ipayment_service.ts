import { Purchase, PurchaseResponse } from "../entities/purchase";

export interface IPaymentService {
  buy(
    newPurchase: Purchase,
    itemId: string,
    userId: string
  ): Promise<PurchaseResponse>;
}
