import { Request, Router } from "express";
import { User } from "../../domain/entities/user";
import { Create } from "../../domain/useCases/user/Create";
import { LoginUser } from "../../domain/useCases/user/LoginUser"
import { UserService } from "../services/user_service";
import { UserAuthentication } from "../../domain/entities/user_authentication";

export const UsersRouter = Router();

UsersRouter.post(
    "/cadastroUser",
    async (request: Request<{}, {}, User, {}>, response) => {
        const { body: newUser } = request;
        try {
            const createUser = new Create(new UserService());
            const createdUser = await createUser.execute(newUser);
            return response.status(200).json(createdUser);
        } catch (error: any) {
            console.log(error)
            return response.status(400).json({
                status: 400,
                message: error?.message || "User was not created.",
                date: new Date(),
            });
        }
    }
);

UsersRouter.post(
    "/loginUser",
    async (request: Request<{}, {}, UserAuthentication, {}>, response) => {
        const { body: user } = request;
        try {
            const loginUser = new LoginUser(new UserService());
            const loggedUser = await loginUser.execute(user);
            return response.status(200).json(loggedUser);
        } catch (error: any) {
            return response.status(400).json({
                status: 400,
                message: error?.message || "User was not logged",
                date: new Date(),
            });
        }
    }
);
