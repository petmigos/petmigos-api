import { Product } from "../../entities/product";
import { IProductService } from "../../ports/iproduct_service";

export class Create {
  constructor(private readonly productService: IProductService) {}

  execute(newProduct: Product, companyId: string) {
    return this.productService.create(newProduct, companyId);
  }
}
