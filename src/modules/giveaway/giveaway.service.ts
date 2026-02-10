import mongoose from "mongoose";
import { ApiError } from "../../utils/api-error.js";
import { GiveawayModel } from "./giveaway.model.js";

export const createGiveaway = async (
  userId: string,
  data: {
    title: string;
    instagramPostUrl: string;
    followedAccounts?: string[];
    endDate: string;
  },
) => {
  return GiveawayModel.create({
    ...data,
    userId,
    endDate: new Date(data.endDate),
  });
};

export const listUserGiveaways = async (userId: string) => {
  return GiveawayModel.find({ userId }).sort({ createdAt: -1 });
};

export const deleteGiveaway = async (userId: string, giveawayId: string) => {
  const result = await GiveawayModel.findOneAndDelete({
    _id: giveawayId,
    userId,
  });

  if (!result) {
    throw new ApiError(404, "Giveaway not found");
  }

  return { success: true };
};

export const updateGiveaway = async (
  userId: string,
  giveawayId: string,
  updates: any,
) => {
  if (!mongoose.Types.ObjectId.isValid(giveawayId)) {
    throw new ApiError(400, "Invalid giveaway ID");
  }

  const giveaway = await GiveawayModel.findOne({
    _id: giveawayId,
    userId,
  });

  if (!giveaway) {
    throw new ApiError(404, "Giveaway not found");
  }

  if (updates.endDate) {
    updates.endDate = new Date(updates.endDate);
  }

  Object.assign(giveaway, updates);
  await giveaway.save();

  return giveaway;
};
