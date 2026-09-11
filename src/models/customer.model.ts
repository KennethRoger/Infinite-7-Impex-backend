import { z } from 'zod';

export const CUSTOMER_PRIORITIES = ['high', 'low', 'medium', 'unset'] as const;
export const CustomerPriorityEnum = z.enum(CUSTOMER_PRIORITIES);

export const CustomerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name should be greater than 1 and less than 20 chars')
    .max(20, 'Name should be greater than 1 and less than 20 chars'),
  email: z.email('Email must be a valid email address'),
  country: z.string().min(1, 'Invalid Country'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
  priority: CustomerPriorityEnum.default('unset'),
  isActive: z.boolean().default(true),
  notes: z.string().default(''),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerPriority = z.infer<typeof CustomerPriorityEnum>;

export const CreateCustomerSchema = CustomerSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;

export const UpdateCustomerSchema = CustomerSchema.omit({
  createdAt: true,
  updatedAt: true,
}).partial();
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;

export const UpdateCustomerPrioritySchema = z.object({
  priority: CustomerPriorityEnum,
});
export type UpdateCustomerPriorityDto = z.infer<typeof UpdateCustomerPrioritySchema>;

export interface CustomerQueryFilters {
  fullName?: string;
  email?: string;
  country?: string;
  priority?: CustomerPriority;
  notes?: string;
  isActive?: boolean;
}