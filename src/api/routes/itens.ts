import { Request, Router } from "express";
import { Item } from "../../domain/entities/Item";
import { RegisterItem } from "../../domain/useCases/itens/Create";
import { ItemService } from "../services/itensService";

export const ItensRouter = Router();

ItensRouter.post(
    "/cadastroItem",
    async (request: Request<{}, {}, Item, {}>, response) => {
        const { body: item } = request;
        try {
            const registerItem = new RegisterItem(new ItemService());
            const registeredItem = await registerItem.execute(item);
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