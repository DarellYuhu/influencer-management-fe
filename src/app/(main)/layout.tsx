"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { ReactNode } from "react";
import { LiaUserCheckSolid } from "react-icons/lia";
import { Toaster } from "sonner";
import { MdOutlineCampaign } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const queryClient = new QueryClient();

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader></SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menus.map((menu, idx) => (
                    <SidebarMenuItem key={idx}>
                      <Link href={menu.url}>
                        <SidebarMenuButton>
                          {<menu.icon />} {menu.title}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter></SidebarFooter>
        </Sidebar>
        <div className="w-full">
          <header className="p-2">
            <SidebarTrigger />
          </header>
          <Separator />
          <main className="p-2">{children}</main>
        </div>
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

const menus = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Influencer",
    url: "/influencer",
    icon: LiaUserCheckSolid,
  },
  {
    title: "Campaign",
    url: "/campaign",
    icon: MdOutlineCampaign,
  },
];
