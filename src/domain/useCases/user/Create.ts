import { User } from "../../entities/user";
import { IUserService } from "../../ports/iuser_service";

export class Create {
    
    constructor(private readonly userService: IUserService) { }

    async execute(newUser: User): Promise<User | undefined> {

        const user_email = await this.userService.findByEmail(newUser.email);
        if(!user_email) {
            return this.userService.create(newUser)
        }
        throw new Error("Um usuário com este Email já foi cadastrado!")
    }
}