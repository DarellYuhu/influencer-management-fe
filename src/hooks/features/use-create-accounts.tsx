import { revalidateData } from "@/actions/revalidate-data";
import { PLATFORM_LIST } from "@/constants";
import { BaseClient } from "@/lib/base-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useCreateAccounts = () => {
  return useMutation({
    mutationFn: async (payload: AddToExistingSchema) => {
      const { data } = await BaseClient.post(`/accounts`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Accounts created!");
      revalidateData("/influencer");
    },
    onError: () => {
      toast.error("Failed to create accounts");
    },
  });
};

export const addToExistingSchema = z.object({
  influencerId: z.string().trim().min(1, { message: "Influencer is required" }),
  accounts: z.array(
    z.object({
      brandingLvl: z.number().min(1).max(5),
      followers: z.coerce.number().positive(),
      username: z.string().trim().min(1, { message: "Username is required" }),
      platform: z.enum(PLATFORM_LIST),
    })
  ),
});
export type AddToExistingSchema = z.infer<typeof addToExistingSchema>;
