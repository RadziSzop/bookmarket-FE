import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { logout } from "@/lib/logout";
import { Link } from "react-router-dom";

interface Props {
  email: string;
}

export const UserNav = ({ email }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {email.slice(0, 24)}...
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"profile"}>
            <DropdownMenuItem>Profil</DropdownMenuItem>
          </Link>
          <Link to={"profile/settings"}>
            <DropdownMenuItem>Ustawienia</DropdownMenuItem>
          </Link>
          <Link to={"yourbooks"}>
            <DropdownMenuItem>Moje książki</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => {
            logout(true);
          }}
        >
          Wyloguj
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
