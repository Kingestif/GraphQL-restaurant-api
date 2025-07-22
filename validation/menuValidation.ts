import { z } from 'zod';

export const menuValidation = z.object({
    id: z.string().min(1, 'id is a required field'),
    name: z.string().min(1, 'name is required'),
    description: z.string().min(1, 'description is required'),
    price: z.number().min(1, 'number is required'),
    category: z.enum(['Appetizer', 'MainCourse', 'Dessert', 'Drink'], {
        message: 'category must be one of Appetizer, Main Course, Dessert, or Drink'
    }),
    available: z.boolean().default(true)
});

export const updateValidation = menuValidation.partial();      