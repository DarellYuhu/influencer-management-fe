"use client";

import { DataTable } from "@/components/custom/data-table";
import { abbreviateNumber } from "@/lib/abbreviate-number";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./action-button";

export const AccountList = ({ data }: { data: Account[] }) => {
  return <DataTable columns={columns} data={data} />;
};

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "followers",
    header: "Followers",
    cell({ row }) {
      return abbreviateNumber(row.original.followers);
    },
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      return <ActionButton id={row.original.id} />;
    },
  },
];
