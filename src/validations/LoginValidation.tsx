import z from "zod";

const loginValidation = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })

})

export default loginValidation
