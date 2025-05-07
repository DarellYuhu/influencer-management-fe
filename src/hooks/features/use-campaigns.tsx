import { BaseClient } from "@/lib/base-client";
import { useQuery } from "@tanstack/react-query";

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data } = await BaseClient.get<Campaign[]>(`/campaigns`);
      return data;
    },
  });
};
