import { Link } from "react-router-dom";
import { UserNav } from "./UserNav.tsx";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "../ui/Button";
import { ModeToggle } from "../ThemeProvider/ModeToggle";

export const Navbar = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);

  return (
    <div className="border-b">
      <nav className="flex h-14 items-center px-4">
        <Link
          to="/"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Książki
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />

          {profile ? (
            <>
              <a href={`/add`}>
                <Button variant={"secondary"}>Sprzedaj</Button>
              </a>
              <UserNav email={profile.email} />
            </>
          ) : (
            <a href={`${import.meta.env.VITE_API_URL}/login`}>
              <Button>Zaloguj</Button>
            </a>
          )}
        </div>
      </nav>
    </div>
  );
};
