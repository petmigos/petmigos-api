import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
  cnpj: String,
  category: String,
  name: String,
  email: String,
  password: String
});


