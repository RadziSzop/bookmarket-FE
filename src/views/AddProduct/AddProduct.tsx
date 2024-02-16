import { Button } from "@/components/ui/Button.tsx";
import { Input } from "@/components/ui/Input.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card.tsx";
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
} from "@/components/ui/Form.tsx";
import { isAxiosError } from "axios";
import type {
  ApiResponseFailure,
  RegisterResponse,
} from "../../types/response.ts";
import { toast } from "react-hot-toast";
import { addProductSchema } from "./AddProductSchema.ts";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select.tsx";
import { DropZone } from "../../components/Dropzone/DropZone.tsx";
import { useState } from "react";
import { apiAuth } from "@/lib/axios.ts";
import { ScrollArea } from "../../components/ui/ScrollArea.tsx";

export const AddProduct = () => {
  const [submitedFile, setSubmitedFile] = useState<File>();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      class: "1",
      condition: undefined,
      subject: undefined,
      price: "5",
    },
  });
  const classes: [number, string][] = [
    [1, "1"],
    [2, "2"],
    [3, "3"],
    [4, "4"],
    [5, "5"],
  ];
  const conditions: [number, string][] = [
    [1, "Nowa"],
    [2, "Lekko zużyta"],
    [3, "Używana"],
    [4, "Zniszczona"],
  ];
  const subjects = [
    "Matematyka",
    "Polski",
    "Angielski",
    "Niemiecki",
    "Historia",
    "Biologia",
    "Chemia",
    "Fizyka",
    "Geografia",
    "WOS",
    "Informatyka",
    "Plastyka",
    "Muzyka",
    "Religia",
    "WF",
    "Technika",
    "Przyroda",
    "Inne",
  ];
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: z.infer<typeof addProductSchema>) => {
      const formData = new FormData();
      formData.append("image", submitedFile!);
      formData.append("title", data.title);
      formData.append("class", data.class!);
      if (data.subject) {
        formData.append("subject", data.subject!);
      }
      formData.append("price", data.price);
      formData.append("condition", data.condition!);
      const response = await apiAuth.post<RegisterResponse>(
        "/store",
        formData,
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
        form.reset();
        form.reset();
        toast.success("Dodano książke!");
      } else {
        toast.error("Wystąpił błąd, spróbuj ponownie.");
      }
    },
  });
  const onSubmit = (values: z.infer<typeof addProductSchema>) => {
    if (!submitedFile) {
      toast.error("Dodaj zdjęcie");
    } else {
      mutate(values);
    }
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Zdjęcie
              </p>
              <DropZone
                setSubmitedFile={setSubmitedFile}
                submitedFile={submitedFile}
              />
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
                        {classes.map(([value, label]) => (
                          <SelectItem key={value} value={String(value)}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[15.25rem]">
                        <ScrollArea>
                          {subjects.map((value) => (
                            <SelectItem key={value} value={String(value)}>
                              {value}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
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
                name="condition"
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
                        {conditions.map(([value, label]) => (
                          <SelectItem key={value} value={String(value)}>
                            {label}
                          </SelectItem>
                        ))}
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
