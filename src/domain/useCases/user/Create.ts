import { User } from "../../entities/user";
import { IUserService } from "../../ports/iuser_service";

export class Create {
    
    constructor(private readonly userService: IUserService) { }

    async execute(newUser: User): Promise<User | undefined> {

        const user = await this.userService.findByEmail(newUser.emailUser);
        console.log(user);
        if(user === undefined) {
            return this.userService.create(newUser)
        }

        throw new Error("Um usuário com este Email já foi cadastrado!")
        
    }
}