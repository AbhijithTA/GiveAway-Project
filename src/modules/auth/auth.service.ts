import bcrypt from "bcrypt";
import { UserModel } from "./user.model.js";
import { ApiError } from "../../utils/api-error.js";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";

export const register = async (email: string, password: string) => {
  const exists = await UserModel.findOne({ email });
  if (exists) throw new ApiError(409, "Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, passwordHash });

  return {
    accessToken: signAccessToken({ userId: user.id }),
    refreshToken: signRefreshToken({ userId: user.id }),
  };
};

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new ApiError(401, "Invalid credentials");

  return {
    accessToken: signAccessToken({ userId: user.id }),
    refreshToken: signRefreshToken({ userId: user.id }),
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await UserModel.findById(userId).select("-passwordHash");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};