import { revalidateData } from "@/actions/revalidate-data";
import { PLATFORM_LIST } from "@/constants";
import { BaseClient } from "@/lib/base-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useCreateCampaign = () => {
  return useMutation({
    mutationFn: async (payload: CreateCampaignSchema) => {
      const { data } = await BaseClient.post("/campaigns", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Campaign created!");
      revalidateData("/campaign");
    },
    onError: () => {
      toast.error("Failed to create influencer");
    },
  });
};

export const createCampaignSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  operationDate: z.date(),
  platform: z.enum(PLATFORM_LIST),
});
export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
