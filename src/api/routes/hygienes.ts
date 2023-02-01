import { Router } from "express";

export const HygienesRouter = Router();

HygienesRouter.get("/pets/hygienes", (request, response) => {
  return response.json({ hello: "world" });
});

HygienesRouter.post("/pets/hygienes", (request, response) => {
  return response.json({ hello: "world" });
});
