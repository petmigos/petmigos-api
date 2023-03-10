require("dotenv").config();
import express from "express";
import { AllergiesRouter } from "./api/routes/allergies";
import { CompanyRouter } from "./api/routes/company";
import { HygienesRouter } from "./api/routes/hygienes";
import { ItensRouter } from "./api/routes/items";
import { PetsRouter } from "./api/routes/pets";
import { UsersRouter } from "./api/routes/users";
import { VaccinesRouter } from "./api/routes/vaccines";

const port = process.env.PORT || 3333;
export const app = express();

app.use(express.json());
app.use(PetsRouter);
app.use(HygienesRouter);
app.use(VaccinesRouter);
app.use(AllergiesRouter);
app.use(UsersRouter);
app.use(CompanyRouter);
app.use(ItensRouter);

app.listen(port, () => {
  console.log(`API running on port: ${port}`);
});
