import { UserAuthentication } from "../../entities/user_authentication";
import { IUserService } from "../../ports/iuser_service";

export class Login {
    constructor(private readonly userService: IUserService) { }

    async execute(UserAuthentication: UserAuthentication): Promise<UserAuthentication | undefined> {
        return this.userService.login(UserAuthentication)
    }
}