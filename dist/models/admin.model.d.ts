import { z } from 'zod';
export declare const AdminSchema: z.ZodObject<{
    email: z.ZodString;
    passwordHash: z.ZodString;
    role: z.ZodDefault<z.ZodLiteral<"admin">>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export type Admin = z.infer<typeof AdminSchema>;
export declare const AdminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type AdminLoginDto = z.infer<typeof AdminLoginSchema>;
//# sourceMappingURL=admin.model.d.ts.map