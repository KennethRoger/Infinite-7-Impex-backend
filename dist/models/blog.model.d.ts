import { z } from 'zod';
export declare const BlogSectionSchema: z.ZodObject<{
    sectionTitle: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
}, z.core.$strip>;
export type BlogSection = z.infer<typeof BlogSectionSchema>;
export declare const BlogSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    sections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        sectionTitle: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type Blog = z.infer<typeof BlogSchema>;
export declare const CreateBlogSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    sections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        sectionTitle: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;
export declare const UpdateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sections: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        sectionTitle: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;
//# sourceMappingURL=blog.model.d.ts.map