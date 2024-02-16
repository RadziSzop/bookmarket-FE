import { Button } from "../../components/ui/Button";
import { TbBooks } from "react-icons/tb";

export const NotLogged = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <TbBooks size="250" fill="#dc2626" />
        <h1 className="text-4xl font-bold">Witaj w BookStore!</h1>
        <p className="text-lg mt-5">Zaloguj aby przejść dalej</p>
        <a href={`${import.meta.env.VITE_API_URL}/login`}>
          <Button className="mt-5 w-44 h-12 text-xl font-bold">Zaloguj</Button>
        </a>
      </div>
    </div>
  );
};
