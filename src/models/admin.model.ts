import { z } from 'zod';

export const AdminSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  passwordHash: z.string(),
  role: z.literal('admin').default('admin'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Admin = z.infer<typeof AdminSchema>;

export const AdminLoginSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type AdminLoginDto = z.infer<typeof AdminLoginSchema>;
