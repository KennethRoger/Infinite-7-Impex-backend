import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export declare const UpdateUserSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
//# sourceMappingURL=user.model.d.ts.map