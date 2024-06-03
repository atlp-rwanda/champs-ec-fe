import z from "zod";
export const otpValidation = z.object({
    otp: z.string().min(6).length(6, { message: "OTP digits must be 6 digits ONLY" })
  });