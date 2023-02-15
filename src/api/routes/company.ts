import { Request, Router } from "express";
import { Company } from "../../domain/entities/company";
import { Create } from "../../domain/useCases/company/Create";
import { LoginCompany } from "../../domain/useCases/company/LoginCompany";
import { CompanyService } from "../services/company_service";
import { UserAuthentication } from "../../domain/entities/user_authentication";

export const CompanyRouter = Router();

CompanyRouter.post(
    "/cadastroCompany",
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

CompanyRouter.post(
    "/loginCompany",
    async (request: Request<{}, {}, UserAuthentication, {}>, response) => {
        const { body: company } = request;
        try {
            const loginCompany = new LoginCompany(new CompanyService());
            const loggedCompany = await loginCompany.execute(company);
            return response.status(200).json(loggedCompany);
        } catch (error: any) {
            return response.status(400).json({
                status: 400,
                message: error?.message || "Company was not logged",
                date: new Date(),
            });
        }
    }
);

CompanyRouter.get("/companies", async (request, response) => {
    try {
      const companyService = new CompanyService();
      const companies = await companyService.getAllCompanies();
      return response.status(200).json(companies);
    } catch (error: any) {
      return response.status(500).json({
        status: 500,
        message: error?.message || "Failed to retrieve companies",
        date: new Date(),
      });
    }
  });