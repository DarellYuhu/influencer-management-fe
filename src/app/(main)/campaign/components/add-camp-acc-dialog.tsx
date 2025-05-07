"use client";

import { revalidateData } from "@/actions/revalidate-data";
import { Button, buttonVariants } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiselect";
import { BaseClient } from "@/lib/base-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddCampAccDialog = ({
  options,
  campaignId,
}: {
  options: { label: string; value: string }[];
  campaignId: string;
}) => {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { accountIds: [] },
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const { data } = await BaseClient.post(
        `/campaigns/${campaignId}/accounts`,
        { accountIds: payload.accountIds.map((item) => item.value) }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Account added!");
      revalidateData("/campaign");
      closeBtn.current?.click();
    },
    onError: () => {
      toast.error("Failed to create influencer");
    },
  });

  const onSubmit = (data: FormSchema) => mutate(data);

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Plus /> Add Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add account to this campaign?</DialogTitle>
          <DialogDescription>
            Select the account you want to add to this campaign below
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="add-to-campaign" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="accountIds"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultipleSelector
                      options={options}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button size={"sm"} type="submit" form="add-to-campaign">
            Submit
          </Button>
          <DialogClose
            className={buttonVariants({ size: "sm", variant: "outline" })}
            ref={closeBtn}
          >
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  accountIds: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});
type FormSchema = z.infer<typeof formSchema>;
