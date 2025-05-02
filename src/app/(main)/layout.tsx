"use client";

import { Separator } from "@/components/ui/separator";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { LiaUserCheckSolid } from "react-icons/lia";
import { Toaster } from "sonner";

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
];
