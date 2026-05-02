import cron from "node-cron";
import { GiveawayModel } from "../modules/giveaway/giveaway.model.js";
import { sendMail } from "../libs/mailer.js";
import { giveawayEndedTemplate } from "../utils/emailTemplates.js";
import { UserModel } from "../modules/auth/user.model.js";

export const startGiveawayExpiryJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Running expiry job...");

    const now = new Date();

    const expired = await GiveawayModel.find({
      endDate: { $lte: now },
      status: "ACTIVE",
      notified: false,
    });

    for (const giveaway of expired) {
      giveaway.status = "ENDED";

      const user = await UserModel.findById(giveaway.userId);

      if (user) {
        await sendMail(
          user.email,
          "Giveaway Ended",
          giveawayEndedTemplate(giveaway.title),
        );
      }

      giveaway.notified = true;
      await giveaway.save();

      console.log(`Expired + Email sent: ${giveaway.title}`);
    }
  });
};
