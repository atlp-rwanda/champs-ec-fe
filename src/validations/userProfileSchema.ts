// validations/userProfileSchema.ts
import { z } from 'zod';

const updateSchema = z.object({
  firstName: z
    .string({ required_error: "FirstName is required" })
    .min(3, "Use at least 3 characters for firstName")
    .max(50, "No more than 50 characters for firstName"),
  lastName: z
    .string({ required_error: "LastName is required" })
    .min(3, "Use at least 3 characters for lastName")
    .max(50, "No more than 50 characters for lastName"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Minimum number for phone field is 10")
    .max(20, "Maximum number for phone field is 20")
    .regex(/^\d+$/, "Phone number must be numeric"),
//   birthDate: z.coerce
//     .date({ required_error: "The date is required" })
//     .refine((data) => data < new Date(), {
//       message: "The date must be in the past"
//     }),
birthDate: z.string().optional(),
  profileImage: z.any(),
  preferredLanguage: z
    .string({ required_error: "Preferred Language is required" })
    .min(3, "Use at least 3 characters for preferredLanguage")
    .max(70, "No more than 70 characters for preferredLanguage"),
  whereYouLive: z
    .string({ required_error: "Where you live is required" })
    .max(70, "No more than 70 characters for whereYouLive"),
    address: z
    .string({ required_error: "Address is required" })
    .max(70, "No more than 70 characters for Adress"),
  preferredCurrency: z
    .string({ required_error: "Preferred Currency is required" })
    .min(2, "Use at least 2 characters for preferredCurrency")
    .max(10, "No more than 10 characters for preferredCurrency"),
  billingAddress: z
    .string({ required_error: "Billing Address is required" })
    .min(5, "Use at least 5 characters for billingAddress")
    .max(70, "No more than 70 characters for billingAddress")
});

export default updateSchema;





