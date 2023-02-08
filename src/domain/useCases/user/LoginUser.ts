import { User } from "../../entities/user";
import { UserAuthentication } from "../../entities/user_authentication";
import { IUserService } from "../../ports/iuser_service";

export class LoginUser {
    constructor(private readonly userService: IUserService) { }

    async execute(userAuthentication: UserAuthentication): Promise<User | undefined> {

        const {email, password} = userAuthentication;
        const user = await this.userService.findUser(email, password);
        console.log(user)
        if (user) return user;
        else throw new Error("Nome de usuário ou login inválido");
        
    }
}

