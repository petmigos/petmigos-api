import { Company } from "../../entities/Company";
import { ICompanyService } from "../../ports/ICompanyService";

export class Create {
  constructor(private readonly companyService: ICompanyService) {}

  async execute(newCompany: Company): Promise<Company | undefined> {
    return this.companyService.create(newCompany);
  }
}