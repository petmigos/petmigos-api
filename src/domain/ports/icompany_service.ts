import { Company } from '../entities/Company'

export interface ICompanyService {
    create(newCompany: Company): Promise<Company | undefined>;
    findByEmail(email: string): Promise<Company | null>;
    findByCNPJ(cnpj: string): Promise<Company | null>;
    findByEmailAndPassword(email: string, password: string): Promise<Company | undefined>;
}