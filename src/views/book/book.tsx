import { apiAuth } from "@/lib/axios";
import { BookResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const Book = () => {
  const { id } = useParams();
  const { isSuccess, data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await apiAuth.get<BookResponse>("store");
      return response.data.data;
    },
  });
  return (
    <div className="h-full grid max-w-5xl mx-auto gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-16 sm:p-4">
      <div className="w-full hover:scale-105 transition-transform  hover:border-2 hover:border-zinc-900 cursor-pointer h-80 rounded-md">
        <img
          className="w-full p-4 h-3/4 object-cover"
          src={`${import.meta.env.VITE_API_URL}/images/${data?.image}`}
          alt={data?.title}
        />
        <h3 className="text-center">{data?.title}</h3>
        <h4 className="text-center text-zinc-300">
          {data?.price.toFixed(2)} zł
        </h4>
      </div>
    </div>
  );
};
