import { z } from 'zod';

const productSchema = z.object({
  productName: z
    .string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(50, 'Product name must not exceed 50 characters'),
  stockLevel: z
    .string()
    .min(1, 'Stock level is required')
    .regex(/[0-9]$/, 'Stock level must be a number'),
  productCategory: z.string().uuid('Invalid product category ID'),
  productPrice: z
    .string()
    .min(1, 'Product Price is required')
    .regex(/[0-9]$/, 'Product price must be a number'),
  discount: z
    .string()
    .regex(/[0-9]$/, 'Product discount must be a number')
    .optional(),
  currency: z
    .string()
    .min(3, 'Currency must be 3 characters')
    .max(3, 'Currency must be 3 characters')
    .regex(/^[^0-9]+$/, 'Currency must be a string with no numbers')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Preferred Currency must start with a capital letter',
    })
    .refine((value) => value === 'RWf' || value === 'USD', {
      message: "Preferred Currency must be either 'RWf' or 'USD'",
    }),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must not exceed 500 characters'),

  expireDate: z
    .string()
    .min(1, 'Expire date is required')
    .refine(
      (data) => {
        if (!data) return false;
        const expireDate = new Date(data);
        const currentDate = new Date();
        return expireDate > currentDate;
      },
      {
        message: `The expire date must be a future date`,
      },
    ),
});

const productUpdateSchema = productSchema;

export { productSchema, productUpdateSchema };
