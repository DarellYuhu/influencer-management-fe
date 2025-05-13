import { BaseClient } from "@/lib/base-client";

export const getNiches = () => {
  return BaseClient.get<Niche[]>("/niches");
};
