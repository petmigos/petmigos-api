import { Router } from "express";

export const HelloRouter = Router();

HelloRouter.get("/", (request, response) => {
  return response.json({ hello: "world" });
});
