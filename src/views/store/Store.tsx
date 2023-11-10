import { apiAuth } from "@/lib/axios";
import { StoreResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export const Store = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const response = await apiAuth.get<StoreResponse>("store");
      return response.data.data;
    },
  });
  return (
    <div className="h-full flex justify-center gap-2 items-center flex-col">
      {isSuccess &&
        data.map((item) => (
          <div key={item.id} className="w-full h-40 border-2 rounded-md">
            <h3 className="h-1/4">{item.title}</h3>
            <img
              className="w-full h-3/4 object-cover rounded-t-md"
              src={`${import.meta.env.VITE_API_URL}/images/${item.image}`}
              alt={item.title}
            />
          </div>
        ))}
    </div>
  );
};
