import { getNiches } from "@/actions/features/get-niches";
import { useQuery } from "@tanstack/react-query";

export const useNiches = () => {
  return useQuery({
    queryKey: ["niches"],
    queryFn: async () => {
      const { data } = await getNiches();
      return data;
    },
  });
};
