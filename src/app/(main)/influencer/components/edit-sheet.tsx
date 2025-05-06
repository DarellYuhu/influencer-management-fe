"use client";

import { Button } from "@/components/ui/button";
import { useAddNiches } from "@/hooks/features/use-add-niches";
import { useNiches } from "@/hooks/features/use-niches";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiselect";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const EditSheet = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("active");

  return (
    <Sheet
      open={!!id}
      onOpenChange={(open) => !open && router.push("/influencer")}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Account Details</SheetTitle>
          <SheetDescription>
            You can edit your account details here
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <EditNiche />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const formSchema = z.object({
  input: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;
const EditNiche = () => {
  const { data: niches } = useNiches();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { input: [] },
  });
  const { mutate } = useAddNiches();
  return (
    <div className="border border-accent-foreground p-3 rounded-md">
      <Form {...form}>
        <form
          className="space-y-2"
          onSubmit={form.handleSubmit((val) =>
            mutate(val.input.map((item) => parseInt(item.value)))
          )}
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Niche</FormLabel>
                <FormControl>
                  <MultipleSelector
                    options={
                      niches?.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                      })) ?? []
                    }
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={"sm"} className="flex place-self-end">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
