import { PurchaseInfo, PurchaseResponse } from "../../entities/purchase";
import { ICompanyService } from "../../ports/icompany_service";
import { IPaymentService } from "../../ports/ipayment_service";

export class BuyItem {
  constructor(
    private readonly paymentService: IPaymentService,
    private readonly companyService: ICompanyService
  ) {}

  async execute(
    newPurchase: PurchaseInfo,
    itemId: string,
    userId: string
  ): Promise<PurchaseResponse> {
    const foundCompany = await this.companyService.findById(userId);
    if (!foundCompany) throw new Error("Company not found");
    return this.paymentService.buy(
      newPurchase,
      itemId,
      foundCompany.paymentCredentials
    );
  }
}
