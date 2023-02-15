import { Request, Router } from "express";
import { Product } from "../../domain/entities/product";
import { Create } from "../../domain/useCases/products/Create";
import { FindAll } from "../../domain/useCases/products/FindAll";
import { FindById } from "../../domain/useCases/products/FindById";
import { ProductService } from "../services/product_service";

export const ProductsRouter = Router();

ProductsRouter.post(
  "/companies/:companyId/products",
  async (
    request: Request<{ companyId: string }, {}, Product, {}>,
    response
  ) => {
    const { companyId } = request.params;
    const { body: newProduct } = request;
    try {
      const create = new Create(new ProductService());
      const createdProduct = await create.execute(newProduct, companyId);
      return response.status(200).json(createdProduct);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Product was not created.",
        date: new Date(),
      });
    }
  }
);

ProductsRouter.get(
  "/companies/:companyId/products",
  async (request: Request<{ companyId: string }, {}, {}, {}>, response) => {
    const { companyId } = request.params;
    try {
      const findAll = new FindAll(new ProductService());
      const allProducts = await findAll.execute(companyId);
      return response.status(200).json(allProducts);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There are no products registered.",
        date: new Date(),
      });
    }
  }
);

ProductsRouter.get(
  "/companies/:companyId/products/:productId",
  async (
    request: Request<{ companyId: string; productId: string }, {}, {}, {}>,
    response
  ) => {
    const { companyId, productId } = request.params;
    try {
      const findById = new FindById(new ProductService());
      const foundProduct = await findById.execute(companyId, productId);
      return response.status(200).json(foundProduct);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Product not found.",
        date: new Date(),
      });
    }
  }
);
