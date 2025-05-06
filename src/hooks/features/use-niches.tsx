import { BaseClient } from "@/lib/base-client";
import { useQuery } from "@tanstack/react-query";

export const useNiches = () => {
  return useQuery({
    queryKey: ["niches"],
    queryFn: async () => {
      const { data } = await BaseClient.get<Niche[]>("/niches");
      return data;
    },
  });
};
