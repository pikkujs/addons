import { z } from 'zod'

// Define Zod schemas for API types

export const WordpressResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type WordpressResource = z.infer<typeof WordpressResourceSchema>
