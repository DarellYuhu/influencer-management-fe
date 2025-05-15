import { BaseClient } from "@/lib/base-client";

export const getInfluencers = () => {
  return BaseClient.get<Influencer[]>("/influencers");
};
