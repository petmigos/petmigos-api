require("dotenv").config();
import express from "express";
import { AllergiesRouter } from "./api/routes/allergies";
import { HygienesRouter } from "./api/routes/hygienes";
import { PetsRouter } from "./api/routes/pets";
import { VaccinesRouter } from "./api/routes/vaccines";

const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(PetsRouter);
app.use(HygienesRouter);
app.use(VaccinesRouter);
app.use(AllergiesRouter);

app.listen(port);
