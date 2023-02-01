import { User } from "../../entities/user";
import { IUserService } from "../../ports/iuser_service";

export class Create {
    constructor(private readonly userService: IUserService) { }

    async execute(newUser: User): Promise<User | undefined> {
        return this.userService.create(newUser)
    }
}