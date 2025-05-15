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
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateNewForm } from "./forms/create-new-form";
import { AddToExistingForm } from "./forms/add-to-existing-form";

export const CreateInfluencerDialog = ({
  influencers,
}: {
  influencers: Influencer[];
}) => {
  const [formId, setFormId] = useState("create-new");
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          size: "sm",
          className: "mb-4",
        })}
      >
        <PlusCircle /> Add new
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new influencer?</DialogTitle>
          <DialogDescription>
            Please fill the form below to add new influencer
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="create-new-tab"
          onValueChange={(val) => setFormId(val.replace(/-tab$/, ""))}
        >
          <TabsList>
            {tabs.map((tab, idx) => (
              <TabsTrigger key={idx} value={`${tab.value}-tab`}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, idx) => (
            <TabsContent key={idx} value={`${tab.value}-tab`}>
              {<tab.component influencers={influencers} formId={tab.value} />}
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter>
          <Button size={"sm"} type="submit" form={`${formId}-form`}>
            Submit
          </Button>
          <DialogClose
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const tabs = [
  {
    component: CreateNewForm,
    label: "Create New",
    value: "create-new",
  },
  {
    component: AddToExistingForm,
    label: "Add to existing",
    value: "add-existing",
  },
];
