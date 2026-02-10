import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import {
  createGiveawaySchema,, updateGiveaway
  updateGiveawaySchema,
} from "./giveaway.schema.js";
import { createGiveaway, deleteGiveaway, listUserGiveaways } from "./giveaway.service.js";
import { ApiError } from "../../utils/api-error.js";

export const createGiveawayHandler = async (
  req: AuthRequest,
  res: Response,
) => {
  const body = createGiveawaySchema.parse(req.body);

  const giveaway = await createGiveaway(req.userId!, body);

  res.status(201).json(giveaway);
};

export const listGiveawaysHandler = async (req: AuthRequest, res: Response) => {
  const giveaways = await listUserGiveaways(req.userId!);
  res.json(giveaways);
};

export const updateGiveawayHandler = async (
  req: AuthRequest,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "ID required");

  const body = updateGiveawaySchema.parse(req.body);

  const updated = await updateGiveaway(req.userId!, id, body);

  res.json(updated);
};

export const deleteGiveawayHandler = async (
  req: AuthRequest,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "ID required");

  await deleteGiveaway(req.userId!, id);

  res.json({ message: "Deleted successfully" });
};
