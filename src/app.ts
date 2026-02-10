import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { giveawayRouter } from "./modules/giveaway/giveaway.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRouter);
app.use("/api/giveaways", giveawayRouter);

app.get("/check", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
