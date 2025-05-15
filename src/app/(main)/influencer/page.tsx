import { CreateInfluencerDialog } from "./components/create-influencer-dialog";
import { CreateNicheDialog } from "./components/create-niche-dialog";
import { AccountList } from "./components/account-list";
import { getAccounts } from "@/actions/features/get-accounts";
import { EditSheet } from "./components/edit-sheet";
import { Suspense } from "react";
import { getNiches } from "@/actions/features/get-niches";
import { getInfluencers } from "@/actions/features/get-influencers";

export default async function InfluencerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const accounts = (await getAccounts(params)).data;
  const niches = (await getNiches()).data;
  const influencers = (await getInfluencers()).data;

  return (
    <>
      <div>
        <div className="flex flex-row justify-between">
          <CreateInfluencerDialog influencers={influencers} />
          <CreateNicheDialog />
        </div>
        <AccountList data={accounts} niches={niches} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSheet />
      </Suspense>
    </>
  );
}
