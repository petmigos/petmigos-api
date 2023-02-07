import { Company } from "../../entities/company";
import { ICompanyService } from "../../ports/ICompanyService";

export class Create {
  constructor(private readonly companyService: ICompanyService) {}

  async execute(newCompany: Company): Promise<Company | undefined> {

     const company_email = await this.companyService.findByEmail(newCompany.email)
     const company_cnpj = await this.companyService.findByCNPJ(newCompany.cnpj)
     if(!company_email && !company_cnpj) 
        {
          return this.companyService.create(newCompany);
        }
    else if(company_cnpj){
      throw new Error("Uma empresa com esse CNPJ já foi cadastrada.")  
    }else{
    throw new Error("Uma empresa com esse E-mail já foi cadastrada.")
    }
  }
}