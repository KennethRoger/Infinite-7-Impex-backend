import { z } from 'zod';

// Embedded document for blog sections
export const BlogSectionSchema = z.object({
  sectionTitle: z.string().optional().or(z.literal('')),
  description: z
    .string({ message: 'Section description is required' })
    .min(1, 'Section description is required'),
});

export type BlogSection = z.infer<typeof BlogSectionSchema>;

// Main blog schema
export const BlogSchema = z.object({
  title: z
    .string({ message: 'Title is required and must be under 150 characters' })
    .min(1, 'Title is required and must be under 150 characters')
    .max(150, 'Title is required and must be under 150 characters'),
  description: z
    .string({ message: 'Description is required' })
    .min(1, 'Description is required'),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')),
  sections: z
    .array(BlogSectionSchema, { message: 'At least one section is required' })
    .min(1, 'At least one section is required')
    .max(5, 'A blog can have a maximum of 5 sections'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Blog = z.infer<typeof BlogSchema>;

// DTO Schemas
export const CreateBlogSchema = BlogSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;

export const UpdateBlogSchema = z.object({
  title: z
    .string({ message: 'Title is required and must be under 150 characters' })
    .min(1, 'Title is required and must be under 150 characters')
    .max(150, 'Title is required and must be under 150 characters')
    .optional(),
  description: z
    .string({ message: 'Description is required' })
    .min(1, 'Description is required')
    .optional(),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')),
  sections: z
    .array(BlogSectionSchema, { message: 'At least one section is required' })
    .min(1, 'At least one section is required')
    .max(5, 'A blog can have a maximum of 5 sections')
    .optional(),
});
export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;

// Lightweight blog projection for list endpoints
export interface BlogSummary {
  _id: string;
  title: string;
  description: string;
  image?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

// Query filters
export interface BlogQueryFilters {
  title?: string | undefined;
}