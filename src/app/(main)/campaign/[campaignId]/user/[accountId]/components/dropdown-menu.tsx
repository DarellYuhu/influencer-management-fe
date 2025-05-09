import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bolt, EllipsisVertical, ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = {
  link: string;
  id: string;
};

export const DropdownMenu = ({ link, id }: Props) => {
  return (
    <ShadcnDropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-3 right-3",
          size: "icon",
        })}
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuLabel>Content Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={link} target="_blank">
          <DropdownMenuItem>
            <ExternalLink /> Visit
          </DropdownMenuItem>
        </Link>
        <Link href={`?edit_id=${id}`}>
          <DropdownMenuItem>
            <Bolt />
            Edit
          </DropdownMenuItem>
        </Link>
        {/* <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </ShadcnDropdownMenu>
  );
};
