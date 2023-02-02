import { Request, Router } from "express";
import { Company } from "../../domain/entities/Company";
import { Create } from "../../domain/useCases/company/Create";
import { CompanyService, CompanyModel } from "../services/company_service";

export const CompanyRouter = Router();

CompanyRouter.post("/company",
    async (request: Request<{}, {}, Company, {}>, response) => {
        const { body: newCompany } = request;
        try {
            const createCompany = new Create(new CompanyService());
            const createdCompany = await createCompany.execute(newCompany);
            return response.status(200).json(createdCompany);
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 400,
                message: error || "Company was not created.",
                date: new Date(),
            });
        }
    }
);

CompanyRouter.get('/company', async (req, res) => {
    try {
      const companies = await CompanyModel.find();
      res.json(companies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
