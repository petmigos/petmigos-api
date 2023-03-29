import { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { configure, preferences } from "mercadopago";
import mongoose, { model, Schema } from "mongoose";
import {
  Purchase,
  PurchaseInfo,
  PurchaseResponse,
  PurchaseStatusEnum,
} from "../../domain/entities/purchase";
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

const PurchaseSchema = new Schema<Purchase>(
  {
    quantity: Number,
    unitPrice: Number,
    title: String,
    transactionCode: String,
    status: {
      type: String,
      default: PurchaseStatusEnum.PENDING,
      enum: Object.values(PurchaseStatusEnum),
    },
    item: { type: Schema.Types.ObjectId, ref: "Item" },
  },
  { timestamps: true }
);

const PurchaseModel = model("Purchase", PurchaseSchema);

export class PaymentService implements IPaymentService {
  private async connect(dbURL?: string): Promise<boolean> {
    if (!dbURL) return false;
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(dbURL);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async buy(
    newPurchase: PurchaseInfo,
    itemId: string,
    accessToken: string
  ): Promise<PurchaseResponse> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const data: MercadoPagoPayment = {
      items: [
        {
          currency_id: "BRL",
          quantity: newPurchase.quantity,
          unit_price: newPurchase.unitPrice,
          title: newPurchase.title || "Produto Petmigos",
        },
      ],
    };
    try {
      configure({
        access_token: accessToken,
      });

      const transactionCode = randomUUID();

      const mercadoResponse = await preferences.create({
        items: data.items,
        notification_url: `http://${process.env.HOST}/companies/items/update?internal_id=${transactionCode}`,
      });

      const createdPurchase = await PurchaseModel.create({
        ...newPurchase,
        transactionCode: transactionCode,
        item: itemId,
      });

      return {
        _id: createdPurchase._id,
        url: mercadoResponse.body["init_point"],
      };
    } catch (error: any) {
      console.log((error as AxiosError).response?.data);
      throw new Error(error.message || "Error on Paygo Payment. ");
    }
  }

  async updateByTransactionCode(transactionCode: string): Promise<void> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    await PurchaseModel.findOneAndUpdate(
      { transactionCode: transactionCode },
      { status: PurchaseStatusEnum.PAID }
    );
  }
}
