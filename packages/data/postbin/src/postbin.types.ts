import { z } from 'zod'

// Define Zod schemas for API types

export const PostbinResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type PostbinResource = z.infer<typeof PostbinResourceSchema>
