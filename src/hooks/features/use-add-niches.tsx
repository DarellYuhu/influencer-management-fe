import { BaseClient } from "@/lib/base-client";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useAddNiches = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("active");
  return useMutation({
    mutationFn: async (payload: number[]) => {
      const { data } = await BaseClient.post(`/accounts/${id}/niches`, {
        nicheIds: payload,
      });
      return data;
    },
    onSuccess() {
      toast.success("Niches added!");
    },
    onError() {
      toast.error("Failed to add niches");
    },
  });
};
