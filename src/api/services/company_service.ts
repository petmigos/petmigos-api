import mongoose from "mongoose";
import { Company } from "../../domain/entities/Company";
import { Address } from "../../domain/entities/Address";
import { ICompanyService } from "../../domain/ports/ICompanyService";

const CompanySchema = new mongoose.Schema<Company>(
    {
        cnpj: String,
        category: String,
        name: String,
        email: String,
        //address: String,
        password: String,
        signature: String
    },
    { timestamps: true }
);

const CompanyModel = mongoose.model<Company>("Company", CompanySchema);

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

    async create(newCompany: Company): Promise<Company | undefined> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const createdCompany = await CompanyModel.create(newCompany);
        return createdCompany;
    }

    async fetchAll(): Promise<Company[]> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) return [];
             const allCompanies = await CompanyModel.find<Company>({});
             return allCompanies;
     }
}