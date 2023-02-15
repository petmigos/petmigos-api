import { IProductService } from "../../ports/iproduct_service";

export class FindAll {
  constructor(private readonly productService: IProductService) {}

  execute(companyId: string) {
    return this.productService.findAll(companyId);
  }
}
