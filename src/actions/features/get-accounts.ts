import { PLATFORM_LIST } from "@/constants";
import { BaseClient } from "@/lib/base-client";

export const getAccounts = async (
  platform?: (typeof PLATFORM_LIST)[number]
) => {
  const response = await BaseClient.get<Account[]>("/accounts", {
    params: { platform },
  });
  return response;
};
