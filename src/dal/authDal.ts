import userModel, { IUser } from "../models/userModel";

export const createUser = async (
  userData: Partial<IUser>,
): Promise<IUser> => {
  const user = new userModel({
    ...userData,
  });
  return await user.save();
};
