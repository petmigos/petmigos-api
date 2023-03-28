import { Request, Router } from "express";
import { Allergy } from "../../domain/entities/allergy";
import { Create } from "../../domain/useCases/allergies/Create";
import { FindAll } from "../../domain/useCases/allergies/FindAll";
import { AllergyService } from "../services/allergy_service";
import { DeleteAllergy } from "../../domain/useCases/allergies/DeleteAllergy";

export const AllergiesRouter = Router();

AllergiesRouter.get(
  "/pets/:id/allergies",
  async (request: Request<{ id: string }, {}, {}, {}>, response) => {
    const { id } = request.params;
    try {
      const findAll = new FindAll(new AllergyService());
      const allAllergies = await findAll.execute(id);
      return response.status(200).json(allAllergies);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There is no allergies registered.",
        date: new Date(),
      });
    }
  }
);

AllergiesRouter.post(
  "/pets/:id/allergies",
  async (request: Request<{ id: string }, {}, Allergy, {}>, response) => {
    const { body: newAllergy } = request;
    const { id: petId } = request.params;

    try {
      const createAllergy = new Create(new AllergyService());
      const createdAllergy = await createAllergy.execute(newAllergy, petId);
      return response.status(200).json(createdAllergy);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Allergy was not created.",
        date: new Date(),
      });
    }
  }
);

AllergiesRouter.delete(
  "/pets/:petId/allergies/:allergyId",
  async (
    request: Request<{ petId: string; allergyId: string }, {}, {}, {}>,
    response
  ) => {
    const { allergyId } = request.params;
    try {
      const deletedAllergy = new DeleteAllergy(new AllergyService());
      await deletedAllergy.execute(allergyId);
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
