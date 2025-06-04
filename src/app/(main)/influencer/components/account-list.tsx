"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/custom/data-table";
import { abbreviateNumber } from "@/lib/abbreviate-number";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./action-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalize } from "lodash";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const AccountList = ({
  data,
  niches,
}: {
  data: Account[];
  niches: Niche[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState({
    followerRange: searchParams.get("followerRange") || "",
    nicheId: searchParams.get("nicheId") || "",
    search: searchParams.get("search") || "",
  });

  const handleSubmit = () => {
    const params = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => value !== "")
    );
    const paramsString = new URLSearchParams(params).toString();
    router.push(`/influencer?${paramsString}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Search..."
          className="w-[180px]"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <Select
          value={filter.followerRange}
          onValueChange={(val) => setFilter({ ...filter, followerRange: val })}
        >
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Select followers range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">0 - 10K</SelectItem>
            <SelectItem value="2">10K - 100K</SelectItem>
            <SelectItem value="3">100K - 1M</SelectItem>
            <SelectItem value="4">{">1M"}</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(val) => setFilter({ ...filter, nicheId: val })}
          value={filter.nicheId}
        >
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Select niche" />
          </SelectTrigger>
          <SelectContent>
            {niches.map((item, idx) => (
              <SelectItem key={idx} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>Search</Button>
        <Button
          onClick={() => {
            setFilter({
              followerRange: "",
              nicheId: "",
              search: "",
            });
            router.push(`/influencer`);
          }}
          variant={"outline"}
        >
          Clear Filter
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell(props) {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src={props.row.original.avatar ?? undefined} />
            <AvatarFallback>
              {capitalize(props.row.original.username[0])}
            </AvatarFallback>
          </Avatar>
          {props.row.original.username}
        </div>
      );
    },
  },
  {
    accessorKey: "followers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Followers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      return abbreviateNumber(row.original.followers);
    },
  },
  {
    accessorKey: "niches",
    header: "Niches",
    cell({ row }) {
      return (
        <div className="flex flex-row flex-wrap gap-2">
          {row.original.niches.map((item, idx) => (
            <Badge key={idx}>{item}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "performance.prodComplexity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Complexity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "performance.messageEmbeding",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message Embeding
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "performance.playToFollowers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Play To Followers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
