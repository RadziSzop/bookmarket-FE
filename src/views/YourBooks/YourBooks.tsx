import { Button } from "@/components/ui/Button";
import { apiAuth } from "@/lib/axios";
import { StoreResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { FaTrashCan } from "react-icons/fa6";

export const YourBooks = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const response = await apiAuth.get<StoreResponse>("/store/mine");
      return response.data.data;
    },
  });
  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 px-16 gap-4 p-4 sm:p-4">
      {isSuccess &&
        data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row  w-full border-2 border-zinc-900 cursor-pointer h-max sm:h-80 rounded-md p-4 gap-1 sm:gap-4"
          >
            <img
              className="sm:w-1/4 object-cover"
              src={`${import.meta.env.VITE_API_URL}/images/${item.image}`}
              alt={item.title}
            />
            <div className="flex flex-col w-full">
              <div>
                <h3 className=" text-4xl mb-2">{item.title}</h3>
                <h4 className=" text-zinc-300 text-2xl mb-2">
                  {item.price.toFixed(2)} zł
                </h4>
              </div>
              <div className="mt-auto flex gap-4 flex-col sm:flex-row w-full">
                <Button variant={"secondary"}>Anuluj rezerwację</Button>
                <Button variant={"secondary"}>Przedłuż rezerwację</Button>

                <Button className="ml-auto" variant="secondary" size="icon">
                  <FaTrashCan />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
