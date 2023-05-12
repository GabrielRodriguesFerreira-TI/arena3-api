import mongoose from "mongoose";
import { iCreateUserModel } from "../interfaces/users/users.types";
import mongoosePaginate from "mongoose-paginate-v2";
import { iCustomModel } from "../interfaces/global/paginate.types";
import { addPasswordHashingToSchema } from "../hooks/hashingPassword";

const userSchema = new mongoose.Schema<iCreateUserModel>(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    imageProfile: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true, autoCreate: false }
);

userSchema.index({ deletedAt: 1 });
userSchema.plugin(mongoosePaginate);

addPasswordHashingToSchema(userSchema);

userSchema.methods.UserWithoutPassword = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  return user;
};

export const User = mongoose.model<
  iCreateUserModel,
  iCustomModel<iCreateUserModel>
>("Users", userSchema);
