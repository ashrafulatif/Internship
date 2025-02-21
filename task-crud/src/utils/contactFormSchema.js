import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  from: z.string().nonempty("Email is required").email("Invalid email format"),
  description: z.string().nonempty("Message is required"),
});
