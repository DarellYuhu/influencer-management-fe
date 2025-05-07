import { BaseClient } from "@/lib/base-client";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useAddCampaigns = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("active");
  return useMutation({
    mutationFn: async (payload: string[]) => {
      const { data } = await BaseClient.post(`/accounts/${id}/campaigns`, {
        campaignIds: payload,
      });
      return data;
    },
    onSuccess() {
      toast.success("Account added!");
    },
    onError() {
      toast.error("Failed to add account");
    },
  });
};
