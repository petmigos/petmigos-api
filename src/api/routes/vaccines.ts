import { Router } from "express";

export const VaccinesRouter = Router();

VaccinesRouter.get("/pets/vaccines", (request, response) => {
  return response.json({ hello: "world" });
});

VaccinesRouter.post("/pets/vaccines", (request, response) => {
  return response.json({ hello: "world" });
});
