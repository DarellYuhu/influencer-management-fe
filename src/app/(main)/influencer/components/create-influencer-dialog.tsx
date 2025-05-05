"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { MinusCircle, Plus, PlusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slider from "@/components/custom/slider";
import {
  createInfluencerSchema,
  CreateInfluencerSchema,
  useCreateInfluencer,
} from "@/hooks/features/use-create-influencer";
import { PLATFORM_LIST } from "@/constants";
import { capitalize } from "lodash";

export const CreateInfluencerDialog = () => {
  const { mutate } = useCreateInfluencer();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const form = useForm<CreateInfluencerSchema>({
    resolver: zodResolver(createInfluencerSchema),
    defaultValues: {
      name: "",
      accounts: [
        { username: "", platform: "TIKTOK", followers: 0, brandingLvl: 1 },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "accounts",
  });

  const onSubmit = (data: CreateInfluencerSchema) => {
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
          <DialogTitle>Add new influencer?</DialogTitle>
          <DialogDescription>
            Please fill the form below to add new influencer
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            id="create-influencer"
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
            <div className="border border-input rounded-md p-2 space-y-3">
              <div className="flex flex-row justify-between">
                <Label>Accounts</Label>
                <Button
                  size={"icon"}
                  className="size-6 rounded-sm"
                  type="button"
                  onClick={() =>
                    append({
                      username: "",
                      platform: "TIKTOK",
                      followers: 0,
                      brandingLvl: 1,
                    })
                  }
                >
                  <Plus />
                </Button>
              </div>
              <Separator />
              {fields.map((item, idx) => (
                <div
                  key={item.id}
                  className="border border-input rounded-md p-2 space-y-2 relative"
                >
                  <Button
                    className="size-6 rounded-sm flex justify-self-end"
                    variant={"destructive"}
                    size={"icon"}
                    type="button"
                    onClick={() => remove(idx)}
                  >
                    <MinusCircle />
                  </Button>
                  <FormField
                    control={form.control}
                    name={`accounts.${idx}.platform`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Platform" />
                            </SelectTrigger>
                            <SelectContent>
                              {PLATFORM_LIST.map((option, idx) => (
                                <SelectItem value={option} key={idx}>
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
                  <FormField
                    control={form.control}
                    name={`accounts.${idx}.username`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`accounts.${idx}.followers`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Followers</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`accounts.${idx}.brandingLvl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branding Level</FormLabel>
                        <FormControl>
                          <Slider
                            max={5}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button size={"sm"} type="submit" form="create-influencer">
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
