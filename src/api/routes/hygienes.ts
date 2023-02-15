import { Request, Router } from "express";
import { Hygiene } from "../../domain/entities/hygiene";
import { Create } from "../../domain/useCases/hygienes/Create";
import { FindAll } from "../../domain/useCases/hygienes/FindAll";
import { HygieneService } from "../services/hygiene_service";

export const HygienesRouter = Router();

HygienesRouter.get(
  "/pets/:id/hygienes",
  async (request: Request<{ id: string }, {}, {}, {}>, response) => {
    const { id } = request.params;
    try {
      const findAll = new FindAll(new HygieneService());
      const allHygienes = await findAll.execute(id);
      return response.status(200).json(allHygienes);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There are no hygienes registered.",
        date: new Date(),
      });
    }
  }
);

HygienesRouter.post(
  "/pets/:id/hygienes",
  async (request: Request<{ id: string }, {}, Hygiene, {}>, response) => {
    const { body: newHygiene } = request;
    const { id: petId } = request.params;

    try {
      const createHygiene = new Create(new HygieneService());
      const createdHygiene = await createHygiene.execute(newHygiene, petId);
      return response.status(200).json(createdHygiene);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Hygiene was not created.",
        date: new Date(),
      });
    }
  }
);
