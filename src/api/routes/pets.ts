import { Request, Router } from "express";
import { Pet } from "../../domain/entities/pet";
import { Create } from "../../domain/useCases/pets/Create";
import { FindAll } from "../../domain/useCases/pets/FindAll";
import { PetService } from "../services/pet_service";

export const PetsRouter = Router();

PetsRouter.post(
  "/cadastroUser/:ownerId/pets",
  async (request: Request<{ ownerId: string}, {}, Pet, {}>, response) => {
    const { body: newPet } = request;
    const { ownerId } = request.params
    try {
      const createPet = new Create(new PetService());
      const createdPet = await createPet.execute(newPet, ownerId);
      return response.status(200).json(createdPet);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Pet was not created.",
        date: new Date(),
      });
    }
  }
);

PetsRouter.get("/pets", async (request, response) => {
  try {
    const findAll = new FindAll(new PetService());
    const allPets = await findAll.execute();
    return response.status(200).json(allPets);
  } catch (error: any) {
    return response.status(400).json({
      status: 400,
      message: error?.message || "There is no pet registered.",
      date: new Date(),
    });
  }
});
