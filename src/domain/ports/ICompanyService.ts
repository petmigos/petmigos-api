import { Company } from '../entities/Company'

export interface ICompanyService {
    create(newCompany: Company): Promise<Company | undefined>;
    //login(company: CompanyAuthentication): Promise<CompanyAuthentication | undefined>;
}