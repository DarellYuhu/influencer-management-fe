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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/custom/slider";
import { Button, buttonVariants } from "@/components/ui/button";
import { useContent } from "@/hooks/features/use-content";
import { BaseClient } from "@/lib/base-client";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  prodComplexity: z.coerce.number().min(1).max(5).optional(),
  messageEmbeding: z.coerce.number().min(1).max(5).optional(),
});
type FormSchema = z.infer<typeof formSchema>;

export const EditContentSheet = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const content = useContent();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("edit_id");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { prodComplexity: undefined, messageEmbeding: undefined },
  });
  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const { data } = await BaseClient.patch(`/contents/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Content updated!");
      closeRef.current?.click();
    },
    onError: () => {
      toast.error("Failed to update content");
    },
  });

  useEffect(() => {
    if (content.data) {
      form.reset({
        prodComplexity: content.data.prodComplexity ?? undefined,
        messageEmbeding: content.data.messageEmbeding ?? undefined,
      });
    }
  }, [content.data, form]);

  return (
    <Sheet
      open={!!id}
      onOpenChange={(open) => {
        if (!open) {
          router.push(pathname);
          form.reset();
        }
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit content details</SheetTitle>
          <SheetDescription>
            You can edit your content details here
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="edit-content-form"
            onSubmit={form.handleSubmit((val) => mutate(val))}
            className="p-4 space-y-8"
          >
            <FormField
              control={form.control}
              name="prodComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Productivity Complexity</FormLabel>
                  <FormControl>
                    <Slider
                      max={5}
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="messageEmbeding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Embeding</FormLabel>
                  <FormControl>
                    <Slider
                      max={5}
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="flex flex-row gap-4 self-end">
          <Button type="submit" form="edit-content-form">
            Submit
          </Button>
          <SheetClose
            className={buttonVariants({ variant: "outline" })}
            ref={closeRef}
          >
            Cancel
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
