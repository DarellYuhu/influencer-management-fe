import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCampaignDialog } from "./components/create-campaign-dialog";
import { BaseClient } from "@/lib/base-client";
import { PLATFORM_LIST } from "@/constants";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCampAccDialog } from "./components/add-camp-acc-dialog";
import { getAccounts } from "@/actions/features/get-accounts";

export default async function CampaignPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const campaign = (await BaseClient.get<Campaign[]>("/campaigns")).data;
  let detail: Detail | undefined;
  let options: { value: string; label: string }[] | undefined;

  if (id) {
    detail = (await BaseClient.get<Detail>("/campaigns/" + id)).data;
    options = (await getAccounts(detail.platform)).data.map((item) => ({
      label: item.username,
      value: item.id,
    }));
  }

  return (
    <div>
      <div className="flex flex-row gap-2">
        <ScrollArea className="size-fit border-[1.5px] p-2 rounded-md border-accent-foreground">
          <CreateCampaignDialog />
          <div className="flex flex-col gap-1 w-60">
            {campaign.map((item, idx) => (
              <Link
                key={idx}
                href={`?id=${item.id}`}
                className={buttonVariants({
                  size: "sm",
                  variant: id === item.id ? "secondary" : "ghost",
                  className: `flex items-start flex-col`,
                })}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
        {detail && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{detail.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Operation Date: {detail.operationDate}</p>
              <p>Platform: {detail.platform}</p>
              <div className="border border-accent-foreground">
                {options && (
                  <AddCampAccDialog options={options} campaignId={detail.id} />
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

type Campaign = {
  id: string;
  name: string;
  platform: (typeof PLATFORM_LIST)[number];
  operationDate: string;
};

type Detail = Campaign & {
  campaignAccount: [];
};
