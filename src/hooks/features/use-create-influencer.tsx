import { revalidateData } from "@/actions/revalidate-data";
import { PLATFORM_LIST } from "@/constants";
import { BaseClient } from "@/lib/base-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useCreateInfluencer = () => {
  return useMutation({
    mutationFn: async (payload: CreateInfluencerSchema) => {
      const { data } = await BaseClient.post("/influencers", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Influencer created");
      revalidateData("/influencer");
    },
    onError: () => {
      toast.error("Failed to create influencer");
    },
  });
};

export const createInfluencerSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  accounts: z.array(
    z.object({
      brandingLvl: z.number().min(1).max(5),
      followers: z.coerce.number().positive(),
      username: z.string().trim().min(1, { message: "Username is required" }),
      platform: z.enum(PLATFORM_LIST),
    })
  ),
});
export type CreateInfluencerSchema = z.infer<typeof createInfluencerSchema>;
