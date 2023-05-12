import { z } from "zod";
import { Document } from "mongoose";
import {
  createUserSchema,
  returnCreateUser,
} from "../../schemas/users/users.schemas";

export interface iCreateUserModel extends Document {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  imageProfile?: string | null;
  isAdmin: boolean;
  deletedAt?: Date;
  UserWithoutPassword: () => Omit<this, "password">;
}

export type iCreateUser = z.infer<typeof createUserSchema>;

export type iCreateUserReturn = z.infer<typeof returnCreateUser>;
