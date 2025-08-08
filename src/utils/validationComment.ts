import { z } from 'zod'

export const commentSchema = z.object({
  author: z.string().optional(),
  content: z
    .string()
    .trim()
    .min(1, 'Content must be at least 1 character long')
    .max(500, 'Content must be less than 500 characters')
})

export type CommentFormData = z.infer<typeof commentSchema>
