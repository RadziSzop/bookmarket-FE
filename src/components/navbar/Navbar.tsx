import { Link } from "react-router-dom";
import { UserNav } from "./UserNav";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "../ui/Button";
import { ModeToggle } from "../ThemeProvider/ModeToggle";

export const Navbar = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);

  return (
    <div className="border-b">
      <div className="flex h-14 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Overview
          </Link>
          <Link
            to="/prcing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            to="/FaQ"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            FaQ
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />

          {profile ? (
            <UserNav email={profile.email} />
          ) : (
            <a href={`${import.meta.env.VITE_API_URL}/login`}>
              <Button>Zaloguj</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
