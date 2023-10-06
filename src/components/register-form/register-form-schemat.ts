import { z } from "zod";

export const registerFormSchema = z.object({
  phoneNumber: z
    .string()
    .length(9, "Numer musi składać się z 9 cyfr w formacie: 123123123")
    .optional(),
  email: z
    .string()
    .email({ message: "Email nie jest prawidłowy." })
    .max(255)
    .optional(),
  confirmPassword: z.string(),
});
