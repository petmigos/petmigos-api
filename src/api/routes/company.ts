import { Request, Router } from "express";
import { Company } from "../../domain/entities/company";
import { Create } from "../../domain/useCases/company/Create";
import { CompanyService } from "../services/company_service";

export const CompanyRouter = Router();

CompanyRouter.post(
    "/company",
    async (request: Request<{}, {}, Company, {}>, response) => {
        const { body: newCompany } = request;
        try {
            const createCompany = new Create(new CompanyService());
            const createdCompany = await createCompany.execute(newCompany);
            return response.status(200).json(createdCompany);
        } catch (error: any) {
            return response.status(400).json({
                status: 400,
                message: error?.message || "Company was not created.",
                date: new Date(),
            });
        }
    }
);
