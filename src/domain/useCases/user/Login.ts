import { Company } from "../../entities/Company";
import { User } from "../../entities/user";
import { UserAuthentication } from "../../entities/user_authentication";
import { ICompanyService } from "../../ports/icompany_service";
import { IUserService } from "../../ports/iuser_service";

export class Login {
    constructor(private readonly userService: IUserService, private readonly companyService: ICompanyService) { }

    async execute(userAuthentication: UserAuthentication): Promise<User | Company | undefined> {

        const {email, password} = userAuthentication;
        const loggedUser = await this.userService.findByEmailAndPassword(email, password);
        const loggedCompany = await this.companyService.findByEmailAndPassword(email, password);

        if (loggedCompany != undefined)  return loggedCompany;
        else if (loggedUser != undefined) return loggedUser;
        else throw new Error("Nome de usuário ou login inválido");
        
    }
}

