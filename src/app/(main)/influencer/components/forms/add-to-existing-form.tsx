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
import { Slider } from "@/components/custom/slider";
import { Button } from "@/components/ui/button";
import { MinusCircle, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ENABLED_PLATFORM_LIST, PLATFORM_LIST } from "@/constants";
import { capitalize } from "lodash";
import {
  addToExistingSchema,
  AddToExistingSchema,
  useCreateAccounts,
} from "@/hooks/features/use-create-accounts";

export const AddToExistingForm = ({
  influencers,
  formId,
}: {
  influencers: Influencer[];
  formId: string;
}) => {
  const { mutate } = useCreateAccounts();
  const form = useForm<AddToExistingSchema>({
    resolver: zodResolver(addToExistingSchema),
    defaultValues: {
      influencerId: "",
      accounts: [
        {
          brandingLvl: 1,
          followers: 0,
          username: "",
          platform: "TIKTOK",
        },
      ],
    },
  });
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "accounts",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((val) => mutate(val))}
        className="space-y-4"
        id={`${formId}-form`}
      >
        <FormField
          control={form.control}
          name="influencerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Influencer</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Influencer" />
                </SelectTrigger>
                <SelectContent>
                  {influencers.map((influencer) => (
                    <SelectItem value={influencer.id} key={influencer.id}>
                      {influencer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                            <SelectItem
                              value={option}
                              key={idx}
                              disabled={!ENABLED_PLATFORM_LIST.includes(option)}
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
  );
};
