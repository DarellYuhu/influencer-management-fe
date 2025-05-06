"use client";

import { Textarea } from "@/components/ui/textarea";
import { BaseClient } from "@/lib/base-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  input: z.string().trim().min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateNicheDialog = () => {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const normalized = payload.input.split(/\s*,\s*/);
      const { data } = await BaseClient.post("/niches", { name: normalized });
      return data;
    },
    onSuccess: () => {
      toast.success("Niche created!");
      closeBtn.current?.click();
    },
    onError: () => {
      toast.error("Failed to create niche");
    },
  });

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <PlusCircle />
        Add niche
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new niche?</DialogTitle>
          <DialogDescription>Fill this field bellow</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="create-niche"
            onSubmit={form.handleSubmit((data) => mutate(data))}
          >
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormDescription>Separate by comma</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            size={"sm"}
            type="submit"
            form="create-niche"
            disabled={isPending}
          >
            Submit
          </Button>
          <DialogClose
            ref={closeBtn}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
