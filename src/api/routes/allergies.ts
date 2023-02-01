import { Router } from "express";

export const AllergiesRouter = Router();

AllergiesRouter.get("/pets/allergies", (request, response) => {
  return response.json({ hello: "world" });
});

AllergiesRouter.post("/pets/allergies", (request, response) => {
  return response.json({ hello: "world" });
});
