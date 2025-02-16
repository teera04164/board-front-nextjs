import { z } from 'zod'

export const signInSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and hyphens'),
})

export const createPostSchema = z.object({
  community: z.string().min(1, 'Please select a community'),
  title: z.string().min(1, 'Title is required').max(300, 'Title must not exceed 300 characters'),
  content: z
    .string()
    .min(10, 'Content is required greater than 10 characters')
    .max(40000, 'Content must not exceed 40,000 characters'),
})
