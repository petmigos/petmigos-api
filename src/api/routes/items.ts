import { Request, Router } from "express";
import { Item } from "../../domain/entities/Item";
import { Create } from "../../domain/useCases/items/Create";
import { FetchAll } from "../../domain/useCases/items/FetchAll";
import { FindById } from "../../domain/useCases/items/FindById";
import { ItemService } from "../services/items_service";

export const ItensRouter = Router();

ItensRouter.post(
  "/companies/:companyId/items",
  async (request: Request<{ companyId: string }, {}, Item, {}>, response) => {
    const { body: item } = request;
    const { companyId } = request.params;
    console.log("Teste");
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

ItensRouter.get(
  "/companies/:companyId/items",
  async (request: Request<{ companyId: string }, {}, {}, {}>, response) => {
    const { companyId } = request.params;
    try {
      const fetchAll = new FetchAll(new ItemService());
      const allItems = await fetchAll.execute(companyId);
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

ItensRouter.get(
  "/companies/:companyId/items/:id",
  async (
    request: Request<{ companyId: string; id: string }, {}, {}, {}>,
    response
  ) => {
    const { companyId, id } = request.params;
    try {
      const findById = new FindById(new ItemService());
      const foundItem = await findById.execute(companyId, id);
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
