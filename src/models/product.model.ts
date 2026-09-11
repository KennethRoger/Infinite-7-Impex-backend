import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  images: z.array(z.string().url()).default([]),
  category: z.string(), // ObjectId reference to productCategory
  isRemoved: z.boolean().default(false),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProductSchema = ProductSchema;
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = ProductSchema.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;