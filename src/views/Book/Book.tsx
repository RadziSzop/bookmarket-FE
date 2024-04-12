import { Button } from "@/components/ui/Button";
import { apiAuth } from "@/lib/axios";
import { handleApiErrors } from "@/lib/handleApiErrors";
import { BookResponse } from "@/types/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const Book = () => {
  const conditions = ["Nowa", "Lekko zużyta", "Używana", "Zniszczona"];
  const { id } = useParams();
  const { isSuccess, data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await apiAuth.get<BookResponse>(`store/${id}`);
      return response.data.data;
    },
    onError: (error) => handleApiErrors(error),
  });
  const { mutate, isSuccess: isMutated } = useMutation({
    mutationFn: async () => {
      const response = await apiAuth.post("store/reservation", {
        id: data?.id,
      });
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Zarezerwowano");
    },
    onError: (error) => handleApiErrors(error),
  });
  if (isSuccess) {
    return (
      <div className="h-full grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 gap-4">
        <img
          className="w-full p-10 md:p-4 md:h-3/4 object-cover my-auto"
          src={`${import.meta.env.VITE_API_URL}/images/${data.image}`}
          alt={data.title}
        />
        <div className="my-auto md:h-3/4  flex flex-col p-4">
          <h3 className="text-4xl mt-4 mb-6">{data.title}</h3>
          <div className={`grid mb-8 grid-cols-${data.subject ? 3 : 2}`}>
            {data.subject && (
              <h3 className="text-2xl">
                Przedmiot:
                <br />
                {data.subject}
              </h3>
            )}
            <h3 className="text-2xl">
              Stan:
              <br />
              {conditions[data.condition - 1]}
            </h3>
            <h3 className="text-2xl">
              Klasa:
              <br />
              {data.class}
            </h3>
          </div>
          <div className="mt-auto justify-between items-end flex">
            <h4 className="text-5xl  text-zinc-300">
              {data?.price.toFixed(2)} zł
            </h4>
            <Button
              disabled={data.reserved || isMutated}
              className="h-14 px-10"
              onClick={() => {
                mutate();
              }}
            >
              Zarezerwuj
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
