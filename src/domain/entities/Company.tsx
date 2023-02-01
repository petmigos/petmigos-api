import mongoose from "mongoose";
import { addressSchema } from "./Address";

const companySchema = new mongoose.Schema({
        cnpj: String,
        category: String,
        name: String,
        email: String,
        address: addressSchema,
        password: String,
        signature: String
});

export const Company = mongoose.model('Company', companySchema);