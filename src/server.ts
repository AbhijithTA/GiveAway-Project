import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import env from "./config/env.js";
import { startGiveawayExpiryJob } from "./jobs/giveawayExpiry.job.js";

const startServer = async () => {
  await connectDB();
  startGiveawayExpiryJob();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();
