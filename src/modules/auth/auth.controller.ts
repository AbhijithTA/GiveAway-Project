import type { Request, Response } from "express";
import { register, login, getCurrentUser } from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

export const registerHandler = async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const tokens = await register(body.email, body.password);
  res.status(201).json(tokens);
};

export const loginHandler = async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const tokens = await login(body.email, body.password);
  res.status(200).json(tokens);
};

export const meHandler = async (req: AuthRequest, res: Response) => {
  const user = await getCurrentUser(req.userId!);
  res.json(user);
};
