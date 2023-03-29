import { AxiosError } from "axios";
import { configure, preferences } from "mercadopago";
import { Purchase, PurchaseResponse } from "../../domain/entities/purchase";
import { IPaymentService } from "../../domain/ports/ipayment_service";

interface MercadoPagoItem {
  title: string;
  quantity: number;
  currency_id: "BRL";
  unit_price: number;
}

interface MercadoPagoPayment {
  items: MercadoPagoItem[];
}

export class PaymentService implements IPaymentService {
  async buy(
    newPurchase: Purchase,
    itemId: string,
    userId: string
  ): Promise<PurchaseResponse> {
    const paymentKey = process.env.PAYMENT_KEY;
    if (!paymentKey) throw new Error("Payment credencials not found.");
    const data: MercadoPagoPayment = {
      items: [
        {
          currency_id: "BRL",
          quantity: 1,
          unit_price: newPurchase.totalPrice,
          title: newPurchase.item?.title || "Compra no Petmigos",
        },
      ],
    };
    try {
      configure({
        access_token: paymentKey,
      });
      const mercadoResponse = await preferences.create(data);
      return {
        _id: `${userId}-${itemId}`,
        url: mercadoResponse.body["sandbox_init_point"],
      };
    } catch (error: any) {
      console.log((error as AxiosError).response?.data);
      throw new Error(error.message || "Error on Paygo Payment. ");
    }
  }
}
