import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { iCreateUserModel } from "../interfaces/users/users.types";

export function addPasswordHashingToSchema(
  schema: Schema<iCreateUserModel>
): void {
  schema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  });
}
