import { z } from 'zod';

export const Updatepassword = z
  .object({
    oldPassword: z.string().nonempty({ message: 'Password is required' }),
    newPassword: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'Include uppercase, number, special characters',
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Confirm Password is required' }),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'new password must be the different to old password ',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'password does not match',
    path: ['confirmPassword'],
  });
