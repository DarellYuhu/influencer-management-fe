import {
  GoHeart,
  GoComment,
  GoShare,
  GoPlay,
  GoDownload,
} from "react-icons/go";
import { abbreviateNumber } from "@/lib/abbreviate-number";
import { BaseClient } from "@/lib/base-client";
import { AddContentDialog } from "./components/add-content-dialog";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DropdownMenu } from "./components/dropdown-menu";
import { EditContentSheet } from "./components/edit-content-sheet";

type PageProps = {
  params: Promise<{ campaignId: string; accountId: string }>;
};

export default async function CampaignUserPage({ params }: PageProps) {
  const { accountId, campaignId } = await params;
  const contents = (
    await BaseClient.get<Content[]>("/contents", {
      params: { accountId, campaignId },
    })
  ).data;

  return (
    <div className="space-y-4">
      <AddContentDialog />
      <div className="flex flex-wrap gap-4">
        {contents.map((item, idx) => (
          <div
            key={idx}
            className="w-96 p-2 border border-accent shadow-sm rounded-md relative"
          >
            <img
              src={item.cover}
              className="h-52 w-full object-contain bg-gray-200 rounded-md"
              alt={`image-${idx}`}
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {format(item.createTime, "dd/MM/yyyy")}
              </div>
              <div className="grid grid-cols-5">
                <div className="flex items-center gap-1">
                  <GoPlay />
                  {abbreviateNumber(item.statistic.play)}
                </div>
                <div className="flex items-center gap-1">
                  <GoHeart />
                  {abbreviateNumber(item.statistic.like)}
                </div>
                <div className="flex items-center gap-1">
                  <GoComment />
                  {abbreviateNumber(item.statistic.comment)}
                </div>
                <div className="flex items-center gap-1">
                  <GoShare />
                  {abbreviateNumber(item.statistic.share)}
                </div>
                <div className="flex items-center gap-1">
                  <GoDownload />
                  {abbreviateNumber(item.statistic.download)}
                </div>
              </div>
              <table>
                <tbody>
                  <tr className="text-sm">
                    <td className="font-semibold">Play to Followers</td>
                    <td className="px-2">:</td>
                    <td>{item.playToFollowers?.toFixed(3)}</td>
                  </tr>
                  <tr className="text-sm">
                    <td className="font-semibold">Production Complexity</td>
                    <td className="px-2">:</td>
                    <td>{item.prodComplexity}</td>
                  </tr>
                  <tr className="text-sm">
                    <td className="font-semibold">Message Embeding</td>
                    <td className="px-2">:</td>
                    <td>{item.messageEmbeding}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm">{item.description}</p>
            </div>
            <DropdownMenu link={item.link} id={item.id} />
          </div>
        ))}
      </div>
      <EditContentSheet />
    </div>
  );
}
