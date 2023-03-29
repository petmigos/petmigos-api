require("dotenv").config();
import { PaymentService } from "../src/api/services/payment_service";

describe("Paygo Payment Service", () => {
  it("should buy a item", async () => {
    const paymentService = new PaymentService();
    const response = await paymentService.buy(
      {
        quantity: 1,
        unitPrice: 20,
        title: "Pagamento",
      },
      "6411fa032f22ce7439ab7382"
    );
    const isValid = response.url !== "" && response._id;
    expect(isValid).toBeTruthy();
  });
});
