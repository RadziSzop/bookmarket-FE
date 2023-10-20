import { z } from "zod";

const durability = [
  { value: "Factory_new", label: "Factory_new" },
  { value: "Minimal_wear", label: "Minimal_wear" },
  { value: "Field_tested", label: "Field_tested" },
  { value: "Well_worn", label: "Well_worn" },
  { value: "Battle_scarred", label: "Battle_scarred" },
] as const;
const VALUES = [
  "Factory_new",
  "Minimal_wear",
  "Field_tested",
  "Well_worn",
  "Battle_scarred",
] as const;

export const addProductSchema = z.object({
  title: z.string().min(5, { message: "Przynajmniej 5 znaków" }),
  class: z.string().max(5).optional().or(z.literal("")),
  subject: z.string().max(25).optional().or(z.literal("")),
  price: z.number().gt(5).lt(1000),
  durabilty: z.enum(VALUES),
  durabilityDescription: z.string().max(255).optional().or(z.literal("")),
});
