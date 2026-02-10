import { z } from "zod";

export const createGiveawaySchema = z.object({
  title: z.string().min(1),
  instagramPostUrl: z.string().url(),
  followedAccounts: z.array(z.string()).optional(),
  endDate: z.string().datetime(),
});

export const updateGiveawaySchema = z.object({
  title: z.string().min(1).optional(),
  instagramPostUrl: z.string().url().optional(),
  followedAccounts: z.array(z.string()).optional(),
  endDate: z.string().datetime().optional(),
  status: z.enum(["ACTIVE", "ENDED", "WON"]).optional(),
});