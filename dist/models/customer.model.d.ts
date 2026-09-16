import { z } from 'zod';
export declare const CUSTOMER_PRIORITIES: readonly ['high', 'low', 'medium', 'unset'];
export declare const CustomerPriorityEnum: z.ZodEnum<{
    high: "high";
    low: "low";
    medium: "medium";
    unset: "unset";
}>;
export declare const CustomerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodEmail;
    country: z.ZodString;
    phone: z.ZodString;
    message: z.ZodString;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodDefault<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerPriority = z.infer<typeof CustomerPriorityEnum>;
export declare const CreateCustomerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodEmail;
    country: z.ZodString;
    phone: z.ZodString;
    message: z.ZodString;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export declare const UpdateCustomerSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    country: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    notes: z.ZodOptional<z.ZodDefault<z.ZodString>>;
}, z.core.$strip>;
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;
export declare const UpdateCustomerPrioritySchema: z.ZodObject<{
    priority: z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
        unset: "unset";
    }>;
}, z.core.$strip>;
export type UpdateCustomerPriorityDto = z.infer<typeof UpdateCustomerPrioritySchema>;
export declare const UpdateCustomerNotesSchema: z.ZodObject<{
    notes: z.ZodString;
}, z.core.$strip>;
export type UpdateCustomerNotesDto = z.infer<typeof UpdateCustomerNotesSchema>;
export interface CustomerQueryFilters {
    fullName?: string;
    email?: string;
    country?: string;
    priority?: CustomerPriority;
    notes?: string;
    isActive?: boolean;
}
//# sourceMappingURL=customer.model.d.ts.map