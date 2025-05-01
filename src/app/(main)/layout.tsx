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
import { Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { LiaUserCheckSolid } from "react-icons/lia";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
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
        <header className="p-4">
          <SidebarTrigger />
        </header>
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
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
