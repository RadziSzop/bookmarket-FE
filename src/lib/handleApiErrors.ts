import { ApiResponseFailure } from "@/types/response";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiErrors = (error: unknown) => {
  if (isAxiosError<ApiResponseFailure>(error)) {
    if (
      error.response &&
      error.response.status !== 404 &&
      error.response.status < 500
    ) {
      const errors = error.response.data.errors
        .map(({ message }) => {
          return message;
        })
        .join("\n");
      toast.error(errors);
    } else {
      toast.error("Wystąpił błąd, spróbuj ponownie.");
    }
  } else {
    toast.error("Wystąpił błąd, spróbuj ponownie.");
  }
};
