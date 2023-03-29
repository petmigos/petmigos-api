import { Request, Router } from "express";
import { Item } from "../../domain/entities/Item";
import { BuyItem } from "../../domain/useCases/items/BuyItem";
import { Create } from "../../domain/useCases/items/Create";
import { Delete } from "../../domain/useCases/items/Delete";
import { FetchAll } from "../../domain/useCases/items/FetchAll";
import { FetchAllByCompany } from "../../domain/useCases/items/FetchAllByCompany";
import { FindById } from "../../domain/useCases/items/FindById";
import { FindByIdAndCompany } from "../../domain/useCases/items/FindByIdAndCompany";
import { CompanyService } from "../services/company_service";
import { ItemService } from "../services/items_service";
import { PaymentService } from "../services/payment_service";

export const ItensRouter = Router();

ItensRouter.post(
  "/companies/:companyId/items",
  async (request: Request<{ companyId: string }, {}, Item, {}>, response) => {
    const { body: item } = request;
    const { companyId } = request.params;
    try {
      const create = new Create(new ItemService());
      const registeredItem = await create.execute(item, companyId);
      return response.status(200).json(registeredItem);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Item was not registered",
        date: new Date(),
      });
    }
  }
);

ItensRouter.post(
  "/companies/:companyId/items/:itemId/buy",
  async (
    request: Request<
      { companyId: string; itemId: string },
      {},
      { quantity: number; unit_price: number; title: string },
      {}
    >,
    response
  ) => {
    const { body: item } = request;
    const { companyId, itemId } = request.params;
    try {
      const buyItem = new BuyItem(new PaymentService(), new CompanyService());
      const purchase = await buyItem.execute(
        {
          quantity: item.quantity,
          unitPrice: item.unit_price,
          title: item.title,
        },
        itemId,
        companyId
      );
      return response.status(200).json(purchase);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Payment not found",
        date: new Date(),
      });
    }
  }
);

ItensRouter.get(
  "/companies/:companyId/items",
  async (request: Request<{ companyId: string }, {}, {}, {}>, response) => {
    const { companyId } = request.params;
    try {
      const fetchAllByCompany = new FetchAllByCompany(new ItemService());
      const allItems = await fetchAllByCompany.execute(companyId);
      return response.status(200).json(allItems);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There are no items registered",
        date: new Date(),
      });
    }
  }
);

ItensRouter.get("/companies/items", async (request, response) => {
  try {
    const fetchAll = new FetchAll(new ItemService());
    const allItems = await fetchAll.execute();
    return response.status(200).json(allItems);
  } catch (error: any) {
    return response.status(400).json({
      status: 400,
      message: error?.message || "There are no items registered",
      date: new Date(),
    });
  }
});

ItensRouter.get(
  "/companies/:companyId/items/:id",
  async (
    request: Request<{ companyId: string; id: string }, {}, {}, {}>,
    response
  ) => {
    const { companyId, id } = request.params;
    try {
      const findByIdAndCompany = new FindByIdAndCompany(new ItemService());
      const foundItem = await findByIdAndCompany.execute(companyId, id);
      return response.status(200).json(foundItem);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There are no items registered",
        date: new Date(),
      });
    }
  }
);

ItensRouter.get(
  "/items/:id",
  async (
    request: Request<{ companyId: string; id: string }, {}, {}, {}>,
    response
  ) => {
    const { id } = request.params;
    try {
      const findById = new FindById(new ItemService());
      const foundItem = await findById.execute(id);
      return response.status(200).json(foundItem);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There are no items registered",
        date: new Date(),
      });
    }
  }
);

ItensRouter.delete(
  "/companies/:companyId/items/:id",
  async (
    request: Request<{ companyId: string; id: string }, {}, {}, {}>,
    response
  ) => {
    const { id } = request.params;
    try {
      const deletedItem = new Delete(new ItemService());
      await deletedItem.execute(id);
      return response.status(200).json({ message: "Item sucessfully deleted" });
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "This item could not be deleted",
        date: new Date(),
      });
    }
  }
);
