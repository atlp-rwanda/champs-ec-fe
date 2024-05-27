import { z } from "zod";

export const signUpVAlidation = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: "firstName is required" })
      .min(4, { message: "The first name is required" }),
    lasttName: z
      .string()
      .nonempty({ message: "lastName is required" })
      .min(3, { message: "minimum length to last name must be 3 char" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Please use valid email" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: "Include uppercase, number, special char",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: "Include uppercase, number, special char",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password must be the same",
    path: ["confirmPassword"],
  });
