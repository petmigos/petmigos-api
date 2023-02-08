import { User } from "../../entities/user";
import { UserAuthentication } from "../../entities/user_authentication";
import { IUserService } from "../../ports/iuser_service";

export class LoginUser {
    constructor(private readonly userService: IUserService) { }

    async execute(userAuthentication: UserAuthentication): Promise<User | undefined> {

        const {email, password} = userAuthentication;
        const loggedUser = await this.userService.findByEmailAndPassword(email, password);

        if (loggedUser != undefined) return loggedUser;
        else throw new Error("Nome de usuário ou login inválido");
        
    }
}

