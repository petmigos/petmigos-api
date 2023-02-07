import { Company } from '../entities/company'

export interface ICompanyService {
    create(newCompany: Company): Promise<Company | undefined>;
    findByEmail(email: string): Promise<Company | null>;
    findByCNPJ(cnpj: string): Promise<Company | null>;
    //login(company: CompanyAuthentication): Promise<CompanyAuthentication | undefined>;
}