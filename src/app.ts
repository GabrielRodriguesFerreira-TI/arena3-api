import "express-async-errors";
import express, { Application, json } from "express";
import cookieParser from "cookie-parser";
import { handleErros } from "./errors/errors";

const app: Application = express();

app.use(json());
app.use(cookieParser());

app.use(handleErros);

export default app;
