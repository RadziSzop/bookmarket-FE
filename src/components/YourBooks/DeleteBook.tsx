import { apiAuth } from "@/lib/axios";
import { StoreResponseOne } from "@/types/response";
import { Button } from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiErrors } from "@/lib/handleApiErrors";
import { FaTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";
interface Props {
  item: StoreResponseOne;
}

export const DeleteBook = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiAuth.delete(`/store/${item.id}`);
      return response.data;
    },
    onError: (error) => handleApiErrors(error),
    onSuccess: () => {
      queryClient.invalidateQueries(["store"]);
      toast.success("Usunięto książkę!");
    },
  });
  return (
    <Button
      className="ml-auto"
      variant="secondary"
      size="icon"
      onClick={() => mutate()}
    >
      <FaTrashCan />
    </Button>
  );
};
