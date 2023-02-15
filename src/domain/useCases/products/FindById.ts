import { IProductService } from "../../ports/iproduct_service";

export class FindById {
  constructor(private readonly productService: IProductService) {}

  async execute(companyId: string, productId: string) {
    const foundProduct = await this.productService.findById(
      companyId,
      productId
    );
    if (!foundProduct) throw new Error("Product not found.");
    return foundProduct;
  }
}
