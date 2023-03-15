import { AxiosError } from "axios";
import { Purchase, PurchaseResponse } from "../../domain/entities/purchase";
import { IPaymentService } from "../../domain/ports/ipayment_service";
import { api } from "./axios_adapter";

interface PaygoPayment {}

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
    const data: PaygoPayment = {};
    try {
      const { data: response } = await api(baseURL).post<PurchaseResponse>(
        `v2/checkout?token=${paymentKey}`,
        data
      );
      return response;
    } catch (error: any) {
      console.log((error as AxiosError).response?.data);
      throw new Error(error.message || "Error on Paygo Payment. ");
    }
  }
}

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
