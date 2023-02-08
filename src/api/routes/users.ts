import { Request, Router } from "express";
import { User } from "../../domain/entities/user";
import { Create } from "../../domain/useCases/user/Create";
import { Login } from "../../domain/useCases/user/Login"
import { UserService } from "../services/user_service";
import { UserAuthentication } from "../../domain/entities/user_authentication";
import { CompanyService } from "../services/company_service";

export const UsersRouter = Router();

UsersRouter.post(
    "/cadastro",
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
    "/login",
    async (request: Request<{}, {}, UserAuthentication, {}>, response) => {
        const { body: user } = request;
        try {
            const loginUser = new Login(new UserService(), new CompanyService());
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
