import z from "zod";

const resetValidation = z.object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "please use correct email format",
      })
  
  })
  
  export default resetValidation