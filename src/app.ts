import "express-async-errors";
import express, { Application, json } from "express";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(json());
app.use(cookieParser());

export default app;
