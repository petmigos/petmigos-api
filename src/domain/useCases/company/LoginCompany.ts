import { Company } from "../../entities/Company";
import { UserAuthentication } from "../../entities/user_authentication";
import { ICompanyService } from "../../ports/icompany_service";

export class LoginCompany {
    constructor(private readonly companyService: ICompanyService) { }

    async execute(userAuthentication: UserAuthentication): Promise<Company | undefined> {

        const { email, password } = userAuthentication;
        const company = await this.companyService.findCompany(email, password);
        if (company) return company;
        else throw new Error("Nome de usuário ou login inválido");

    }
}

