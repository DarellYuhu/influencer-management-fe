import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const SidebarHeader = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row gap-2 items-center border shadow-sm rounded-md p-2">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-start">
          <p className="text-sm font-bold">John Doe</p>
          <p className="text-[14px] text-muted-foreground">Admin</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={true}>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
