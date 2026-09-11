import { z } from 'zod';

export const CustomerPriorityEnum = z.enum(['high', 'low', 'medium', 'unset']);

export const CustomerSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email(),
  country: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  priority: CustomerPriorityEnum.default('unset'),
  isActive: z.boolean().default(true),
  notes: z.string().optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerPriority = z.infer<typeof CustomerPriorityEnum>;

export const CreateCustomerSchema = CustomerSchema;
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;

export const UpdateCustomerSchema = CustomerSchema.partial();
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;