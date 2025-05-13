import { BaseClient } from "@/lib/base-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useAccount = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("active");

  return useQuery({
    queryKey: ["accounts", id],
    queryFn: async () => {
      const { data } = await BaseClient.get<Account>(`/accounts/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
