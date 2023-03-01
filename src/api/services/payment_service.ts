import { AxiosError } from "axios";
import { Purchase, PurchaseResponse } from "../../domain/entities/purchase";
import { IPaymentService } from "../../domain/ports/ipayment_service";
import { api } from "./axios_adapter";

interface PaygoItem {
  quantity: number;
  description: string;
  unit_price: number;
}

interface PaygoPayment {
  integration: {
    reference: string;
    notification_url: string;
    project: number;
  };
  order: {
    currency: "BRL";
    items: PaygoItem[];
  };
  checkout: {
    language: "pt_BR";
    redirect_urls: {
      success: string;
    };
  };
  charge: {
    country: "BR";
    type: "CREDIT_CARD" | "DEBIT_CARD" | "PIX";
  };
}

export class PaymentService implements IPaymentService {
  async buy(
    newPurchase: Purchase,
    itemId: string,
    userId: string
  ): Promise<PurchaseResponse> {
    const baseURL = process.env.PAYMENT_URL;
    const paymentKey = process.env.PAYMENT_KEY;
    if (!paymentKey || !baseURL)
      throw new Error("Payment credencials not found.");
    const encodingKey = Buffer.from(paymentKey).toString("base64");
    const data: PaygoPayment = {
      integration: {
        reference: "PETMIGOS",
        notification_url: "http://petmigos.shop/payments/notify",
        project: 1,
      },
      checkout: {
        language: "pt_BR",
        redirect_urls: {
          success: "http://petmigos.shop/payments/success",
        },
      },
      order: {
        currency: "BRL",
        items: [
          {
            description:
              newPurchase.item?.description || "Produto comprado na Petmigos",
            quantity: newPurchase.quantity,
            unit_price: newPurchase.item?.price || newPurchase.totalPrice,
          },
        ],
      },
      charge: {
        country: "BR",
        type: "DEBIT_CARD",
      },
    };
    try {
      const { data: response } = await api(baseURL).post<PurchaseResponse>(
        "/v3/checkouts",
        data,
        {
          headers: {
            Authorization: `Basic ${encodingKey}`,
          },
        }
      );
      return response;
    } catch (error: any) {
      console.log((error as AxiosError).response?.data);
      throw new Error(error.message || "Error on Paygo Payment. ");
    }
  }
}

// Formato de envio de pedido para a Payment API
// {
//   "reference_id": "ex-00001",
//   "customer": {
//       "name": "Jose da Silva",
//       "email": "email@test.com",
//       "tax_id": "12345678909",
//       "phones": [
//           {
//               "country": "55",
//               "area": "11",
//               "number": "999999999",
//               "type": "MOBILE"
//           }
//       ]
//   },
//   "items": [
//       {
//           "reference_id": "referencia do item",
//           "name": "nome do item",
//           "quantity": 1,
//           "unit_amount": 500
//       }
//   ],
//   "qr_codes": [
//       {
//           "amount": {
//               "value": 500
//           }
//       }
//   ],
//   "shipping": {
//       "address": {
//           "street": "Avenida Brigadeiro Faria Lima",
//           "number": "1384",
//           "complement": "apto 12",
//           "locality": "Pinheiros",
//           "city": "São Paulo",
//           "region_code": "SP",
//           "country": "BRA",
//           "postal_code": "01452002"
//       }
//   },
//   "notification_urls": [
//       "https://meusite.com/notificacoes"
//   ]
// }
