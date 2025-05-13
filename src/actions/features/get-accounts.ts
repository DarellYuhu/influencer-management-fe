import { PLATFORM_LIST } from "@/constants";
import { BaseClient } from "@/lib/base-client";

type Query = {
  platform?: (typeof PLATFORM_LIST)[number];
  nicheId?: string;
  followerRange?: string;
  search?: string;
};

export const getAccounts = async (query?: Query) => {
  const response = await BaseClient.get<Account[]>("/accounts", {
    params: query,
  });
  return response;
};
