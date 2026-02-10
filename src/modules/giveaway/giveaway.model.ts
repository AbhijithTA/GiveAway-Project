import mongoose from "mongoose";

export type GiveawayStatus = "ACTIVE" | "ENDED" | "WON";

const giveawaySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: { type: String, required: true },
    instagramPostUrl: { type: String, required: true },

    followedAccounts: {
      type: [String],
      default: [],
    },

    endDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "ENDED", "WON"],
      default: "ACTIVE",
      index: true,
    },

    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const GiveawayModel = mongoose.model("Giveaway", giveawaySchema);
