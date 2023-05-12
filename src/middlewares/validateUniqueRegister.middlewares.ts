import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.model";
import { AppError } from "../errors/errors";

export const validateUniqueRegisterMiddleare = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email || req.body.username) {
    const userEmail = await User.findOne({
      email: req.body.email,
    });

    const userUsername = await User.findOne({
      username: req.body.username,
    });

    if (userEmail) {
      throw new AppError(`Email "${userEmail.email}" already exists`, 409);
    }

    if (userUsername) {
      throw new AppError(
        `Username "${userUsername.username}" already exists`,
        409
      );
    }
  }

  next();
};
