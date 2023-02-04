import { UserAuthentication } from "../../entities/user_authentication";
import { IUserService } from "../../ports/iuser_service";

export class Login {
    constructor(private readonly userService: IUserService) { }

    async execute(UserAuthentication: UserAuthentication): Promise<UserAuthentication | undefined> {
        const log_user = await this.userService.login(UserAuthentication);

        if(log_user != undefined) {
            return this.userService.login(UserAuthentication)
        }
        
        throw new Error("Nome de usuário ou login inválido");
    }
}