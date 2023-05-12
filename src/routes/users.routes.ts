import { Router } from "express";
import multer from "multer";
import imageMidiaConfigMulter from "../config/imageMidia.config.multer";
import * as Users from "../controllers/users/index";
import { validateBodyMiddleware } from "../middlewares";
import { createUserSchema } from "../schemas/users/users.schemas";
import { validateUniqueRegisterMiddleare } from "../middlewares/validateUniqueRegister.middlewares";

export const usersRoutes: Router = Router();
const upload = multer(imageMidiaConfigMulter);

usersRoutes.post(
  "/users",
  validateBodyMiddleware(createUserSchema),
  validateUniqueRegisterMiddleare,
  Users.default.users.createUserController
);
