import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { z } from "zod";
import { useForm } from "react-hook-form";
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
import type {
  ApiResponseFailure,
  RegisterResponse,
} from "../types/response.ts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addProductSchema } from "./add-product-schema.ts";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      class: "",
      subject: "",
      price: 0.01,
    },
  });
  //
  //
  // axios post do zmiany o.O
  // sad emote
  //nie ma radka i nie umiem axiosa nie wiem ocb
  //pozdrawiam
  //

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: z.infer<typeof addProductSchema>) => {
      const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { title: data.title, class: data.class },
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
          toast.error("Wystąpił błąd, spróbuj ponownie.");
        }
      } else {
        toast.error("Wystąpił błąd, spróbuj ponownie.");
      }
    },
    onSuccess: async (data) => {
      if (data.data.response.success) {
        navigate("/verify");
        toast.success("Udało się przesłać dane!");
      } else {
        toast.error("Wystąpił błąd, spróbuj ponownie.");
      }
    },
  });
  const onSubmit = (values: z.infer<typeof addProductSchema>) => {
    mutate(values);
  };
  return (
    <div className="h-full flex justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle>Dodaj książkę</CardTitle>
          <CardDescription>
            Podaj podstawowe informacje dotyczące książki
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tytuł</FormLabel>
                    <FormControl>
                      <Input placeholder="Tytuł" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klasa</FormLabel>
                    <FormControl>
                      <Input placeholder="Klasa" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Przedmiot</FormLabel>
                    <FormControl>
                      <Input placeholder="Przedmiot" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena</FormLabel>
                    <FormControl>
                      <Input placeholder="Cena" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durabilty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zużycie</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Factory_new">Factory_new</SelectItem>
                        <SelectItem value="Minimal_wear">
                          Minimal_wear
                        </SelectItem>
                        <SelectItem value="Field_tested">
                          Field_tested
                        </SelectItem>
                        <SelectItem value="Well_worn">Well_worn</SelectItem>
                        <SelectItem value="Battle_scarred">
                          Battle_scarred
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-2" disabled={isLoading}>
                Prześlij
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
