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
        console.log(newUser)
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

UsersRouter.get(
    "/users/:userId",
    async (request, response) => {
        try{
            console.log("user route")
            const userService = new UserService();
            const user = userService.findUserById(request.params.userId);
            console.log("user: " + user)
            return response.status(200).json(user);
        }
        catch (error: any) {
            return response.status(500).json({
              status: 500,
              message: error?.message || "Failed to retrieve users",
              date: new Date(),
            });
        }
    }


)
