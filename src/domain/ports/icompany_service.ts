import { Company } from "../entities/Company";

export interface ICompanyService {
  create(newCompany: Company): Promise<Company | undefined>;
  findByEmail(email: string): Promise<Company | null>;
  findByCNPJ(cnpj: string): Promise<Company | null>;
  findByPassword(password: string): Promise<Company | null>;
  findCompany(email: string, password: string): Promise<Company | null>;
  findById(id: string): Promise<Company | null | undefined>;
}
