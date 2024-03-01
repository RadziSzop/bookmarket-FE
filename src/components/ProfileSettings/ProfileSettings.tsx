import { Button } from "@/components/ui/Button.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form.tsx";
import { isAxiosError } from "axios";
import type {
  ApiResponseFailure,
  ProfileUpdateResponse,
} from "../../types/response.ts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { profileUpdateSchema } from "./ProfileSettingsSchema.ts";
import { useMutation } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { apiAuth } from "@/lib/axios.ts";

export const ProfileSettings = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: z.infer<typeof profileUpdateSchema>) => {
      const response = await apiAuth.put<ProfileUpdateResponse>(
        `${import.meta.env.VITE_API_URL}/profile`,
        { extraContact: data.extraContact }
      );
      return response;
    },
    onError: (error) => {
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
    },
    onSuccess: async (data) => {
      if (data.data.success) {
        navigate("/");
        toast.success("Udało się przesłać dane!");
      } else {
        toast.error("Wystąpił błąd, spróbuj ponownie.");
      }
    },
  });
  const onSubmit = (values: z.infer<typeof profileUpdateSchema>) => {
    if (form.getValues().extraContact.length > 0) {
      mutate(values);
    } else {
      navigate("/");
    }
  };
  const { fields, append } = useFieldArray({
    control: form.control,
    name: "extraContact",
  });

  return (
    <div className="h-full flex justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-1 w-96 max-h-[calc(100%-20px)] p-4"
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Inne formy kontaktu
          </h4>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`extraContact.${index}.socialName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nazwa" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`extraContact.${index}.socialLink`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontakt</FormLabel>
                    <FormControl>
                      <Input placeholder="Kontakt" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          {(form?.getValues()?.extraContact?.length < 6 ||
            form?.getValues()?.extraContact?.length === undefined) && (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full mt-2"
                onClick={() => {
                  append({ socialName: "", socialLink: "" });
                }}
              >
                <FiPlus />
              </Button>
            </>
          )}
          <Button type="submit" className="mt-2" disabled={isLoading}>
            Prześlij
          </Button>
        </form>
      </Form>
    </div>
  );
};
