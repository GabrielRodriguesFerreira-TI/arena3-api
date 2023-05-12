import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().max(50).min(4),
  password: z.string().max(200).min(4),
  email: z.string().email().max(50),
  firstName: z.string().max(50).min(4),
  lastName: z.string().max(50).min(4),
  isAdmin: z.boolean().optional(),
});

export const returnCreateUser = z.object({
  _id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  imageProfile: z.string().optional(),
  isAdmin: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
