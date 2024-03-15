import { apiAuth } from "@/lib/axios";
import { StoreResponseOne } from "@/types/response";
import { Button } from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiErrors } from "@/lib/handleApiErrors";
interface Props {
  item: StoreResponseOne;
}

export const CancleReservation = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiAuth.delete(`/store/reservation/${item.id}`);
      return response.data;
    },
    onError: (error) => handleApiErrors(error),
    onSuccess: () => {
      queryClient.invalidateQueries(["store"]);
    },
  });
  return (
    <Button variant={"secondary"} onClick={() => mutate()}>
      Anuluj rezerwację
    </Button>
  );
};
