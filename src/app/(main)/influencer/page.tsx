import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateInfluencerDialog } from "./components/create-influencer-dialog";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BaseClient } from "@/lib/base-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateNicheDialog } from "./components/create-niche-dialog";
import { AccountList } from "./components/account-list";
import { getAccounts } from "@/actions/features/get-accounts";
import { EditSheet } from "./components/edit-sheet";

export default async function InfluencerPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const accounts = (await getAccounts()).data;
  const { data } = await BaseClient.get<Influencer[]>("/influencers");
  const { id } = await searchParams;
  const detail = id
    ? await BaseClient.get<Detail>("/influencers/" + id)
    : undefined;

  return (
    <div>
      <div className="flex flex-row gap-2">
        <ScrollArea className="size-fit border-[1.5px] p-2 rounded-md border-accent-foreground">
          <div className="flex flex-row justify-between">
            <CreateInfluencerDialog />
            <CreateNicheDialog />
          </div>
          <div className="flex flex-col gap-1 w-60">
            {data.map((item, idx) => (
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
              <CardTitle>{detail.data.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {detail.data.account.map((item, idx) => (
                <div key={idx} className="flex flex-row gap-2">
                  <p>{item.username}</p>
                  <p>{item.followers}</p>
                  <p>{item.brandingLvl}</p>
                  <p>{item.platform}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <AccountList data={accounts} />
      <EditSheet />
    </div>
  );
}

type Influencer = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Detail = Influencer & { account: Account[] };
