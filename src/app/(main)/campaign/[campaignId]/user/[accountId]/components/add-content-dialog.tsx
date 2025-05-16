"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseClient } from "@/lib/base-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PlusCircle, PlusIcon, Trash2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { revalidateData } from "@/actions/revalidate-data";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/custom/date-picker";

const formSchema = z.object({
  content: z
    .array(
      z.object({
        link: z.string().url(),
        duration: z.number().optional(),
        description: z.string().optional(),
        createTime: z.date().optional(),
        imageLink: z.string().url().optional(),
        statistic: z.object({
          comment: z.coerce.number().min(0),
          like: z.coerce.number().min(0),
          download: z.coerce.number().min(0),
          play: z.coerce.number().min(0),
          share: z.coerce.number().min(0),
          forward: z.coerce.number().min(0),
        }),
      })
    )
    .min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

export const AddContentDialog = () => {
  const [inputMode, setInputMode] = useState<"auto" | "manual">("auto");
  const pathname = usePathname();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const params = useParams();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: [
        {
          link: "",
          createTime: undefined,
          imageLink: undefined,
          description: undefined,
          duration: undefined,
          statistic: {
            comment: 0,
            like: 0,
            download: 0,
            play: 0,
            share: 0,
            forward: 0,
          },
        },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: "content",
    control: form.control,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const dataPayload: DataPayload = {
        campaignId: params.campaignId! as string,
        accountId: params.accountId! as string,
      };
      if (inputMode === "auto")
        dataPayload.urls = payload.content.map((item) => item.link);
      if (inputMode === "manual") dataPayload.manualData = payload.content;
      const { data } = await BaseClient.post("/contents", dataPayload, {
        params: { schema: inputMode },
      });
      return data;
    },
    onSuccess() {
      toast.success("Content added!");
      closeBtn.current?.click();
      revalidateData(pathname);
    },
    onError() {
      toast.error("Failed to add content");
    },
  });

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <PlusCircle /> Add content
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-auto">
        <DialogHeader>
          <DialogTitle>Want to add a new content?</DialogTitle>
          <DialogDescription>
            Please fill the field bellow. Click plus sign to add another field
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-3"
            id="add-content"
            onSubmit={form.handleSubmit((val) => mutate(val))}
          >
            <div className="flex justify-between flex-row">
              <ToggleGroup
                type="single"
                variant="outline"
                value={inputMode}
                onValueChange={(value) => {
                  if (value) setInputMode(value as typeof inputMode);
                }}
              >
                <ToggleGroupItem className="flex-1" value="auto">
                  Auto
                </ToggleGroupItem>
                <ToggleGroupItem className="flex-1" value="manual">
                  Manual
                </ToggleGroupItem>
              </ToggleGroup>
              <Button
                type="button"
                onClick={() =>
                  append({
                    link: "",
                    imageLink: undefined,
                    duration: undefined,
                    createTime: undefined,
                    description: undefined,
                    statistic: {
                      comment: 0,
                      like: 0,
                      download: 0,
                      play: 0,
                      share: 0,
                      forward: 0,
                    },
                  })
                }
                size={"icon"}
              >
                <PlusIcon />
              </Button>
            </div>
            {fields.map((value, idx) => (
              <div key={value.id} className="space-y-2 border p-4 rounded-md">
                <FormField
                  key={value.id}
                  control={form.control}
                  name={`content.${idx}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Link #${idx + 1}`}</FormLabel>
                      <div className="flex flex-row gap-2">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <Button
                          variant={"destructive"}
                          size={"icon"}
                          type="button"
                          onClick={() => remove(idx)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {inputMode === "manual" && (
                  <>
                    <FormField
                      control={form.control}
                      name={`content.${idx}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`content.${idx}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={6} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`content.${idx}.createTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Creation Time</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onValueChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`content.${idx}.imageLink`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image Link</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-2">
                      <FormField
                        control={form.control}
                        name={`content.${idx}.statistic.comment`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`content.${idx}.statistic.like`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Like</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`content.${idx}.statistic.download`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Download</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`content.${idx}.statistic.play`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Play</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`content.${idx}.statistic.share`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Share</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`content.${idx}.statistic.forward`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Forward</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </form>
        </Form>
        <DialogFooter>
          <Button
            size={"sm"}
            form="add-content"
            type="submit"
            disabled={fields.length === 0 || isPending}
          >
            Submit
          </Button>
          <DialogClose
            ref={closeBtn}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type DataPayload = {
  accountId: string;
  campaignId: string;
  urls?: string[];
  manualData?: {
    link: string;
    createTime?: Date;
    description?: string;
    imageLink?: string;
    statistic: {
      comment: number;
      download: number;
      forward: number;
      like: number;
      play: number;
      share: number;
    };
  }[];
};
