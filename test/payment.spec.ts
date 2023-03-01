require("dotenv").config();
import { PaymentService } from "../src/api/services/payment_service";
import {
  PaymentTypeEnum,
  PurchaseStatusEnum,
} from "../src/domain/entities/purchase";

describe("Paygo Payment Service", () => {
  it("should buy a item", async () => {
    const paymentService = new PaymentService();
    const response = await paymentService.buy(
      {
        quantity: 1,
        status: PurchaseStatusEnum.PENDING,
        totalPrice: 20,
        item: {
          category: "Banho e tosa",
          description: "Banho",
          image: "https://github.com/gabrielSantosLima.png",
          price: 20,
          title: "Banho e tosa - Petshop AuAu",
        },
        payment: {
          country: "BR",
          type: PaymentTypeEnum.DEBIT_CARD,
        },
      },
      "1",
      "1"
    );
    const isValid = response.url !== "" && response._id;
    expect(isValid).toBeTruthy();
  });
});
