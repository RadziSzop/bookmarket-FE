import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios, { isAxiosError } from "axios";
import type { ApiResponseFailure, RegisterResponse } from "../types/response";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerFormSchema } from "./register-form-schemat.ts";
import { useMutation } from "@tanstack/react-query";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      phoneNumber: "",
      email: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: z.infer<typeof registerFormSchema>) => {
      const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { phoneNumber: data.phoneNumber, email: data.email },
        {
          timeout: 20000,
        }
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
          const errors = error.response.data.response.errors
            .map(({ message }) => {
              return message;
            })
            .join("\n");
          toast.error(errors);
        } else {
          toast.error("An error occurred, please try again later.");
        }
      } else {
        toast.error("An error occurred, please try again later.");
      }
    },
    onSuccess: async (data) => {
      if (data.data.response.success) {
        navigate("/verify");
      } else {
        toast.error("An error occurred, please try again later.");
      }
      console.log(data);
    },
  });
  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    console.log(values);
    mutate(values);
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer telefonu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Numer telefonu"
                    type="text"
                    {...field}
                    pattern="[0-9]+"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dodatkowy adres email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2" disabled={isLoading}>
            Prześlij
          </Button>
        </form>
      </Form>
    </div>
  );
};
