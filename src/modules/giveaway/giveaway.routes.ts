import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createGiveawayHandler,
  deleteGiveawayHandler,
  listGiveawaysHandler,
  updateGiveawayHandler,
} from "./giveaway.controller.js";

export const giveawayRouter = Router();

giveawayRouter.use(authMiddleware);

giveawayRouter.post("/", createGiveawayHandler);
giveawayRouter.get("/", listGiveawaysHandler);
giveawayRouter.patch("/:id", updateGiveawayHandler);
giveawayRouter.delete("/:id", deleteGiveawayHandler);
