import { IPaymentService } from "../../ports/ipayment_service";

export class UpdateByTransactionCode {
  constructor(private readonly paymentService: IPaymentService) {}

  async execute(transactionCode: string) {
    return this.paymentService.updateByTransactionCode(transactionCode);
  }
}
