import { Company } from '../entities/company'

export interface ICompanyService {
    create(newCompany: Company): Promise<Company | undefined>;
    findByCNPJ(cnpj: string): Promise<Company | null>;
    findByEmailAndPassword(email: string, password: string): Promise<Company | undefined>;
}