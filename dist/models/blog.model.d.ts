import { z } from 'zod';
export declare const BlogSectionSchema: z.ZodObject<{
    sectionTitle: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    description: z.ZodString;
}, z.core.$strip>;
export type BlogSection = z.infer<typeof BlogSectionSchema>;
export declare const BlogSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    image: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    sections: z.ZodArray<z.ZodObject<{
        sectionTitle: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        description: z.ZodString;
    }, z.core.$strip>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export type Blog = z.infer<typeof BlogSchema>;
export declare const CreateBlogSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    image: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    sections: z.ZodArray<z.ZodObject<{
        sectionTitle: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        description: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;
export declare const UpdateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
        sectionTitle: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        description: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;
export interface BlogSummary {
    _id: string;
    title: string;
    description: string;
    image?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}
export interface BlogQueryFilters {
    title?: string | undefined;
}
//# sourceMappingURL=blog.model.d.ts.map