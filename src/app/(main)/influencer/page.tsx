import { CreateInfluencerDialog } from "./components/create-influencer-dialog";
import { CreateNicheDialog } from "./components/create-niche-dialog";
import { AccountList } from "./components/account-list";
import { getAccounts } from "@/actions/features/get-accounts";
import { EditSheet } from "./components/edit-sheet";
import { Suspense } from "react";

export default async function InfluencerPage() {
  const accounts = (await getAccounts()).data;

  return (
    <>
      <div>
        <div className="flex flex-row justify-between">
          <CreateInfluencerDialog />
          <CreateNicheDialog />
        </div>
        <AccountList data={accounts} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSheet />
      </Suspense>
    </>
  );
}
