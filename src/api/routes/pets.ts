import { Request, Router } from "express";
import { Pet } from "../../domain/entities/pet";
import { Create } from "../../domain/useCases/pets/Create";
import { FindAll } from "../../domain/useCases/pets/FindAll";
import { PetService } from "../services/pet_service";
import { FindById } from "../../domain/useCases/pets/FindById";
import { Update } from "../../domain/useCases/pets/Update";
import { Delete } from "../../domain/useCases/pets/Delete";

export const PetsRouter = Router();

PetsRouter.post(
  "/user/:userId/pets",
  async (request: Request<{userId: string}, {}, Pet, {}>, response) => {
    const { body: newPet } = request;
    const { userId } = request.params
    try {
      const createPet = new Create(new PetService());
      const createdPet = await createPet.execute(newPet, userId);
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

PetsRouter.get("/user/:userId/pets", async (request, response) => {
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

PetsRouter.get(
  "/user/:userId/pets/:petId",
  async (
    request: Request<{ userId: string, petId: string }, {}, {}, {}>, 
    response) => {
    const { userId, petId } = request.params;
    try {
      const findById = new FindById(new PetService());
      const foundPet = await findById.execute(petId);
      return response.status(200).json(foundPet);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "There is no pet registered.",
        date: new Date(),
      });
    }
  });

PetsRouter.post(
  "/user/:userId/pets/:petId",
  async (request: Request<{petId: string}, {}, Pet, {}>, response) => {
    const { body: newPet } = request;
    const { petId } = request.params
    try {
      const updatePet = new Update(new PetService());
      const updatedPet = await updatePet.execute(petId, newPet);
      return response.status(200).json(updatedPet);
    } catch (error: any) {
      return response.status(400).json({
        status: 400,
        message: error?.message || "Pet was not updated.",
        date: new Date(),
      });
    }
  });

PetsRouter.delete(
  "/user/:userId/pets/:petId",
  async (
    request: Request<{ userId: string; petId: string }, {}, {}, {}>,
    response
  ) => {
    const { petId } = request.params;
    try {
      const deletedItem = new Delete(new PetService());
      await deletedItem.execute(petId);
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
