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
import { Calendar, ImageOff } from "lucide-react";
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
  const statistics = (
    await BaseClient.get<Statistic & Perf>(
      `/campaigns/${campaignId}/accounts/${accountId}/statistics`
    )
  ).data;

  return (
    <div className="space-y-4">
      <AddContentDialog />
      <div className="border border-accent-foreground p-2 rounded-md flex flex-row gap-2 flex-wrap place-self-start">
        <p className="font-bold">Avg: </p>
        <div className="flex items-center gap-1">
          <GoPlay />
          {abbreviateNumber(statistics.play)}
        </div>
        <div className="flex items-center gap-1">
          <GoHeart />
          {abbreviateNumber(statistics.like)}
        </div>
        <div className="flex items-center gap-1">
          <GoComment />
          {abbreviateNumber(statistics.comment)}
        </div>
        <div className="flex items-center gap-1">
          <GoShare />
          {abbreviateNumber(statistics.share)}
        </div>
        <div className="flex items-center gap-1">
          <GoDownload />
          {abbreviateNumber(statistics.download)}
        </div>
      </div>
      <table>
        <tbody>
          <tr className="text-sm">
            <td className="font-semibold">Play to Followers</td>
            <td className="px-2">:</td>
            <td>{statistics.playToFollowers?.toFixed(3)}</td>
          </tr>
          <tr className="text-sm">
            <td className="font-semibold">Production Complexity</td>
            <td className="px-2">:</td>
            <td>{statistics.prodComplexity}</td>
          </tr>
          <tr className="text-sm">
            <td className="font-semibold">Message Embeding</td>
            <td className="px-2">:</td>
            <td>{statistics.messageEmbeding}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-wrap gap-4">
        {contents.map((item, idx) => (
          <div
            key={idx}
            className="w-96 p-2 border border-accent shadow-sm rounded-md relative"
          >
            <div className="h-52 w-full bg-gray-200 rounded-md flex items-center justify-center">
              {item.cover ? (
                <img
                  src={item.cover}
                  alt={`image-${idx}`}
                  className=" object-contain w-full h-full"
                />
              ) : (
                <ImageOff className="size-20" />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {item.createTime ? format(item.createTime, "dd/MM/yyyy") : "-"}
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
