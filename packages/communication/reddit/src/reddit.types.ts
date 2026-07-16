import { z } from 'zod'

// Define Zod schemas for API types

export const RedditResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type RedditResource = z.infer<typeof RedditResourceSchema>
