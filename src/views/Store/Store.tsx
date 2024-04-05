import { apiAuth } from "@/lib/axios";
import { StoreResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
export const Store = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const response = await apiAuth.get<StoreResponse>("store");
      return response.data.data;
    },
  });
  return (
    <>
      {isSuccess && data.length > 0 ? (
        <div className="h-full grid max-w-5xl mx-auto gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-16 sm:p-4">
          {data.map((item) => (
            <Link to={`/book/${item.id}`}>
              <div
                key={item.id}
                className="w-full hover:scale-105 transition-transform  hover:border-2 hover:border-zinc-900 cursor-pointer h-80 rounded-md"
              >
                <img
                  className="w-full p-4 h-3/4 object-cover"
                  src={`${import.meta.env.VITE_API_URL}/images/${item.image}`}
                  alt={item.title}
                />
                <h3 className="text-center">{item.title}</h3>
                <h4 className="text-center text-zinc-300">
                  {item.price.toFixed(2)} zł
                </h4>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-full flex">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold m-auto text-center">
            Narazie książek brak...
          </h2>
        </div>
      )}
    </>
  );
};
