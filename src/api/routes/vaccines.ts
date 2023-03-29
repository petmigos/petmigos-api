import { Request, Router } from "express";
import { Vaccine } from "../../domain/entities/vaccine";
import { Create } from "../../domain/useCases/vaccines/Create";
import { FindAll } from "../../domain/useCases/vaccines/FindAll";
import { VaccineService } from "../services/vaccine_service";
import { DeleteVaccine } from "../../domain/useCases/vaccines/DeleteVaccine";
import { Update } from "../../domain/useCases/vaccines/Update";

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
        message: error?.message || "There is no vaccines registered.",
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

VaccinesRouter.post(
  "/pets/:petId/vaccines/:vaccineId",
  async (request: Request<{vaccineId: string}, {}, Vaccine, {}>, response) => {
    const { body: newVaccine } = request;
    const { vaccineId } = request.params
    try {
      const updateVaccine = new Update(new VaccineService());
      const updatedVaccine = await updateVaccine.execute(vaccineId, newVaccine);
      return response.status(200).json(updatedVaccine);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Vaccine was not updated.",
        date: new Date(),
      });
    }
  });

VaccinesRouter.delete(
  "/pets/:petId/vaccines/:vaccineId",
  async (
    request: Request<{ petId: string; vaccineId: string }, {}, {}, {}>,
    response
  ) => {
    const { vaccineId } = request.params;
    try {
      const deletedVaccine = new DeleteVaccine(new VaccineService());
      await deletedVaccine.execute(vaccineId);
      return response.status(200).json({message: "Item sucessfully deleted"});
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "This item could not be deleted",
        date: new Date(),
      });
    }
  }
);
