import { z } from 'zod'

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .trim()
    .min(5, 'Content must be at least 5 characters long')
    .max(1000, 'Content must be less than 1000 characters')
})

export type PostFormData = z.infer<typeof postSchema>
