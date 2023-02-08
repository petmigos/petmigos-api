import { Company } from "../../entities/company";
import { UserAuthentication } from "../../entities/user_authentication";
import { ICompanyService } from "../../ports/icompany_service";

export class LoginCompany {
    constructor(private readonly companyService: ICompanyService) { }

    async execute(userAuthentication: UserAuthentication): Promise<Company | undefined> {

        const { email, password } = userAuthentication;
        const loggedCompany = await this.companyService.findByEmailAndPassword(email, password);

        if (loggedCompany != undefined) return loggedCompany;
        else throw new Error("Nome de usuário ou login inválido");

    }
}

