import "express-async-errors";
import express, { Application, json } from "express";
import cookieParser from "cookie-parser";
import { handleErros } from "./errors/errors";
import { usersRoutes } from "./routes/users.routes";

const app: Application = express();

app.use(json());
app.use(cookieParser());

app.use("", usersRoutes);

app.use(handleErros);

export default app;
