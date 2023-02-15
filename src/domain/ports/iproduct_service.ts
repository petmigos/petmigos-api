import { Product } from "../entities/product";

export interface IProductService {
  create(newProduct: Product, companyId: string): Promise<Product | undefined>;
  findAll(companyId: string): Promise<Product[]>;
  findById(companyId: string, productId: string): Promise<Product | undefined>;
}
