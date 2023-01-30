import { Request, Router } from "express";
import { SayHello } from "../../domain/useCases/say_hello";
import { HelloService } from "../services/hello_service";

export const HelloRouter = Router();

HelloRouter.get(
  "/",
  (request: Request<{}, {}, {}, { name?: string }>, response) => {
    const { name } = request.query;
    const helloService = new HelloService();
    const sayHello = new SayHello(helloService);

    return response.json({ hello: sayHello.execute(name) });
  }
);
