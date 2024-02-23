import { z } from "zod";

export const profileUpdateSchema = z.object({
  extraContact: z
    .object({
      socialName: z
        .string()
        .min(2, "Nazwa jest za krótka")
        .max(64, "Nazwa jest za długa")
        .optional(),
      socialLink: z
        .string()
        .min(2, "Nazwa jest za krótka")
        .max(64, "Nazwa jest za długa")
        .optional(),
    })
    .array(),
});
