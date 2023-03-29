import { PurchaseInfo, PurchaseResponse } from "../entities/purchase";

export interface IPaymentService {
  buy(
    newPurchase: PurchaseInfo,
    itemId: string,
    accessToken: string
  ): Promise<PurchaseResponse>;
}
