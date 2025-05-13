"use client";

import { revalidateData } from "@/actions/revalidate-data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/hooks/features/use-account";
import { BaseClient } from "@/lib/base-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
});
type FormSchema = z.infer<typeof formSchema>;

export const EditAccountForm = () => {
  const { data: account } = useAccount();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const { data } = await BaseClient.patch(
        `/accounts/${account?.id}`,
        payload
      );
      return data;
    },
    onSuccess() {
      toast.success("Account updated!");
      revalidateData("/influencer");
    },
    onError() {
      toast.error("Failed to update account");
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({ username: account.username });
    }
  }, [account]);

  return (
    <div className="border border-accent-foreground p-3 rounded-md space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((val) => mutate(val))}
          id="edit-account-form"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        size={"sm"}
        className="flex place-self-end"
        type="submit"
        form="edit-account-form"
      >
        Save
      </Button>
    </div>
  );
};
