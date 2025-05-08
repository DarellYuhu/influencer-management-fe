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
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { revalidateData } from "@/actions/revalidate-data";

const formSchema = z.object({
  content: z.array(z.object({ link: z.string().url() })).min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

export const AddContentDialog = () => {
  const pathname = usePathname();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const params = useParams();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: [{ link: "" }] },
  });
  const { fields, remove, append } = useFieldArray({
    name: "content",
    control: form.control,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const { data } = await BaseClient.post("/contents", {
        urls: payload.content.map((item) => item.link),
        campaignId: params.campaignId,
        accountId: params.accountId,
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
      <DialogContent>
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
            <Button
              className="flex place-self-end"
              type="button"
              onClick={() => append({ link: "" })}
              size={"icon"}
            >
              <PlusIcon />
            </Button>
            {fields.map((value, idx) => (
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
