import { ObjectId } from "mongodb";
import { User } from "../../entities/user";
import { UserAuthentication } from "../../entities/user_authentication";
import { IUserService } from "../../ports/iuser_service";

export class Find {
    constructor(private readonly userService: IUserService) { }

    async execute(id: string): Promise<User | undefined> {
        
        const user = await this.userService.findUserById(id)
        if (user) return user;
        else throw new Error("User not found.");
        
    }
}

