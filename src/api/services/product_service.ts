import mongoose, { Schema } from "mongoose";
import { Product } from "../../domain/entities/product";
import { ProductCategoryEnum } from "../../domain/entities/product_category_enum";
import { IProductService } from "../../domain/ports/iproduct_service";

const ProductSchema = new Schema<Product>(
  {
    category: {
      type: String,
      default: ProductCategoryEnum.ACESSORIO,
      enum: Object.values(ProductCategoryEnum),
    },
    description: String,
    imageURL: String,
    name: String,
    unitPrice: Number,
    company: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<Product>("Products", ProductSchema);

export class ProductService implements IProductService {
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

  async create(
    newProduct: Product,
    companyId: string
  ): Promise<Product | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdProduct = await ProductModel.create({
      ...newProduct,
      company: companyId,
    });
    return createdProduct;
  }

  async findAll(companyId: string): Promise<Product[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const allProducts = await ProductModel.find({
      company: companyId,
    }).populate("company");
    return allProducts;
  }

  async findById(
    companyId: string,
    productId: string
  ): Promise<Product | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundProduct = await ProductModel.findOne({
      _id: productId,
      company: companyId,
    }).populate("company");
    if (!foundProduct) return undefined;
    return foundProduct;
  }
}
