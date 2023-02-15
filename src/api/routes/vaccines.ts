import { Request, Router } from "express";
import { Vaccine } from "../../domain/entities/vaccine";
import { Create } from "../../domain/useCases/vaccines/Create";
import { FindAll } from "../../domain/useCases/vaccines/FindAll";
import { VaccineService } from "../services/vaccine_service";

export const VaccinesRouter = Router();

VaccinesRouter.get(
  "/pets/:id/vaccines",
  async (request: Request<{ id: string }, {}, {}, {}>, response) => {
    const { id } = request.params;
    try {
      const findAll = new FindAll(new VaccineService());
      const allVaccines = await findAll.execute(id);
      return response.status(200).json(allVaccines);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There are no vaccines registered.",
        date: new Date(),
      });
    }
  }
);

VaccinesRouter.post(
  "/pets/:id/vaccines",
  async (request: Request<{ id: string }, {}, Vaccine, {}>, response) => {
    const { body: newHygiene } = request;
    const { id: petId } = request.params;

    try {
      const createVaccine = new Create(new VaccineService());
      const createdVaccine = await createVaccine.execute(newHygiene, petId);
      return response.status(200).json(createdVaccine);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Vaccine was not created.",
        date: new Date(),
      });
    }
  }
);
