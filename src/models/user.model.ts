import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = UserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;