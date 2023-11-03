import { z } from "zod";

const classValues = ["1", "2", "3", "4", "5"] as const;
const conditionValues = ["1", "2", "3", "4"] as const;
const subjectValues = [
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
] as const;

export const addProductSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Tytuł musi miec przynajmniej 5 znaków" })
    .max(50, { message: "Tytuł może mieć maksymalnie 50 znaków" }),
  price: z.string().refine((val) => {
    if (Number(val) < 5 || Number(val) > 1000) {
      return { message: "Cena musi być w przedziale od 5 do 1000 zł" };
    }
    return true;
  }),

  class: z.enum(classValues).optional(),
  subject: z.enum(subjectValues).optional(),
  condition: z.enum(conditionValues, {
    required_error: "Wybierz stan przedmiotu",
  }),
});
