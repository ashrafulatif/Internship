import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().nonempty("Name is required").min(4, "Name is too short"),
  from: z.string().nonempty("Email is required").email("Invalid email format"),
  description: z.string().nonempty("Message is required"),
});
