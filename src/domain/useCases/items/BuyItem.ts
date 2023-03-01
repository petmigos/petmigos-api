import { Purchase, PurchaseResponse } from "../../entities/purchase";
import { IPaymentService } from "../../ports/ipayment_service";

export class BuyItem {
  constructor(private readonly paymentService: IPaymentService) {}

  async execute(
    newPurchase: Purchase,
    itemId: string,
    userId: string
  ): Promise<PurchaseResponse> {
    return this.paymentService.buy(newPurchase, itemId, userId);
  }
}
