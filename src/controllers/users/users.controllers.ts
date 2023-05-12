import { Request, Response } from "express";
import {
  iCreateUser,
  iCreateUserReturn,
} from "../../interfaces/users/users.types";
import * as Users from "../../services/users/index";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userBody: iCreateUser = req.body;

  const createdUser: iCreateUserReturn = await Users.createUserService(
    userBody
  );

  return res.status(201).json(createdUser);
};
