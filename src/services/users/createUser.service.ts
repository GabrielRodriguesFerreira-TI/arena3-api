import {
  iCreateUser,
  iCreateUserReturn,
} from "../../interfaces/users/users.types";
import { User } from "../../models/User.model";

export const createUserService = async (
  payload: iCreateUser
): Promise<iCreateUserReturn> => {
  const user = await User.create(payload);
  const userWithoutPassword =
    user.UserWithoutPassword() as unknown as iCreateUserReturn;

  return userWithoutPassword;
};
