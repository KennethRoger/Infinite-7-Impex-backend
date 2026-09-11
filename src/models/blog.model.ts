import { z } from 'zod';

// Embedded document for blog sections
export const BlogSectionSchema = z.object({
  sectionTitle: z.string().optional(),
  description: z.string().min(1),
});

export type BlogSection = z.infer<typeof BlogSectionSchema>;

// Main blog schema with embedded sections
export const BlogSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  image: z.string().url().optional(),
  sections: z.array(BlogSectionSchema).default([]),
});

export type Blog = z.infer<typeof BlogSchema>;

export const CreateBlogSchema = BlogSchema;
export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;

export const UpdateBlogSchema = BlogSchema.partial();
export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;