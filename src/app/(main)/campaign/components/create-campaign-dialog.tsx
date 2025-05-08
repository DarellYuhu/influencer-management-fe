"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createCampaignSchema,
  CreateCampaignSchema,
  useCreateCampaign,
} from "@/hooks/features/use-create-campaign";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { PLATFORM_LIST } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/custom/date-picker";
import { capitalize } from "lodash";

export const CreateCampaignDialog = () => {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const { mutate } = useCreateCampaign();
  const form = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: "",
      operationDate: undefined,
      platform: "TIKTOK",
    },
  });

  const onSubmit = (data: CreateCampaignSchema) => {
    mutate(data, {
      onSuccess: () => {
        closeBtn.current?.click();
      },
    });
  };

  return (
    <Dialog onOpenChange={(open) => open && form.reset()}>
      <DialogTrigger
        className={buttonVariants({
          size: "sm",
          className: "mb-4",
        })}
      >
        <PlusCircle /> Add new
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new campaign?</DialogTitle>
          <DialogDescription>
            Please fill the form below to add new campaign
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            id="create-campaign"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onValueChange={(val) => {
                        if (val) field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`platform`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLATFORM_LIST.map((option, idx) => (
                          <SelectItem
                            value={option}
                            key={idx}
                            disabled={option !== "TIKTOK"}
                          >
                            {capitalize(option)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button size={"sm"} type="submit" form="create-campaign">
            Submit
          </Button>
          <DialogClose
            className={buttonVariants({ size: "sm", variant: "outline" })}
            ref={closeBtn}
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
