import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GoComment,
  GoDownload,
  GoHeart,
  GoPlay,
  GoShare,
} from "react-icons/go";
import { AddCampAccDialog } from "./components/add-camp-acc-dialog";
import { getAccounts } from "@/actions/features/get-accounts";
import { Rating } from "@/components/custom/rating";
import { abbreviateNumber } from "@/lib/abbreviate-number";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCampaignDialog } from "./components/create-campaign-dialog";
import { BaseClient } from "@/lib/base-client";
import { buttonVariants } from "@/components/ui/button";

type Detail = Campaign & {
  campaignAccount: Account[];
  statistic: Statistic;
};

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
    options = (await getAccounts({ platform: detail.platform })).data.map(
      (item) => ({
        label: item.username,
        value: item.id,
      })
    );
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
              <CardDescription>
                <p>Operation Date: {detail.operationDate}</p>
                <p>Platform: {detail.platform}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-accent-foreground p-2 rounded-md flex flex-row gap-2 flex-wrap place-self-end">
                <div className="flex items-center gap-1">
                  <GoPlay />
                  {abbreviateNumber(detail.statistic.play)}
                </div>
                <div className="flex items-center gap-1">
                  <GoHeart />
                  {abbreviateNumber(detail.statistic.like)}
                </div>
                <div className="flex items-center gap-1">
                  <GoComment />
                  {abbreviateNumber(detail.statistic.comment)}
                </div>
                <div className="flex items-center gap-1">
                  <GoShare />
                  {abbreviateNumber(detail.statistic.share)}
                </div>
                <div className="flex items-center gap-1">
                  <GoDownload />
                  {abbreviateNumber(detail.statistic.download)}
                </div>
              </div>
              <div className="border border-accent-foreground p-2 rounded-md">
                {options && (
                  <AddCampAccDialog options={options} campaignId={detail.id} />
                )}
                <div className="grid grid-cols-4 pt-2 gap-4">
                  {detail.campaignAccount.map((item, idx) => (
                    <Link
                      href={`/campaign/${id}/user/${item.id}`}
                      key={idx}
                      className="bg-card shadow-sm border p-2 rounded-md"
                    >
                      <p className="font-semibold">{item.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {abbreviateNumber(item.followers)}
                      </p>
                      <Rating filled={item.brandingLvl} size="sm" />
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
