import z from "zod";

const passwordValidation=z.object({
    password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Include uppercase, number, special char",
    }),
  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm Password is required" })
    .min(6, {
      message: "Confirm Password must be at least 8 characters long",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Include uppercase, number, special char",
    }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "password must be the same",
  path: ["confirmPassword"],
 });

export default passwordValidation