import { z } from 'zod';
export declare const CustomerPriorityEnum: z.ZodEnum<{
    high: "high";
    low: "low";
    medium: "medium";
    unset: "unset";
}>;
export declare const CustomerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    country: z.ZodString;
    phone: z.ZodString;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerPriority = z.infer<typeof CustomerPriorityEnum>;
export declare const CreateCustomerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    country: z.ZodString;
    phone: z.ZodString;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export declare const UpdateCustomerSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;
//# sourceMappingURL=customer.model.d.ts.map