import { BaseClient } from "@/lib/base-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("edit_id");

  return useQuery({
    queryKey: ["content", id],
    queryFn: async () => {
      const { data } = await BaseClient.get<Content>(`/contents/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
