import mongoose from "mongoose";
import { Company } from "../../domain/entities/Company";
import { ICompanyService } from "../../domain/ports/icompany_service";

const CompanySchema = new mongoose.Schema<Company>(
  {
    cnpj: String,
    category: String,
    name: String,
    email: String,
    password: String,
    signature: String,
    address_cep: String,
    address_uf: String,
    address_cidade: String,
    address_logradouro: String,
    address_numero: String,
    address_complemento: String,
    paymentCredentials: String,
  },
  { timestamps: true }
);

export const CompanyModel = mongoose.model<Company>("Company", CompanySchema);

export class CompanyService implements ICompanyService {
  private async connect(dbURL?: string): Promise<boolean> {
    if (!dbURL) return false;
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(dbURL);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async findById(id: string): Promise<Company | null | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundCompany = await CompanyModel.findOne({ _id: id });
    return foundCompany;
  }

  async findByEmail(email: string): Promise<Company | null> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundCompany = await CompanyModel.findOne({ email: email });
    return foundCompany;
  }

  async findByPassword(password: string): Promise<Company | null> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundCompany = await CompanyModel.findOne({ password: password });
    return foundCompany;
  }

  async findByCNPJ(cnpj: string): Promise<Company | null> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundCompany = await CompanyModel.findOne({ cnpj: cnpj });
    return foundCompany;
  }

  async findCompany(email: string, password: string): Promise<Company | null> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const foundCompany = await CompanyModel.findOne({
      email: email,
      password: password,
    });
    return foundCompany;
  }

  async create(newCompany: Company): Promise<Company | undefined> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const createdCompany = await CompanyModel.create(newCompany);
    return createdCompany;
  }

  async getAllCompanies(): Promise<Company[]> {
    const isConnected = await this.connect(process.env.DB_URL);
    if (!isConnected) throw new Error("Database was not connected.");
    const companies = await CompanyModel.find();
    return companies;
  }
}
