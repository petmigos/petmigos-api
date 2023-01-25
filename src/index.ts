import express from "express";
import { HelloRouter } from "./api/routes/hello";

const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(HelloRouter);

app.listen(port);
