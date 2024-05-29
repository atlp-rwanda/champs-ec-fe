import z from "zod";

const loginValidation = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter in proper email format" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Password should include uppercase, number, special char",
    })

})

export default loginValidation
