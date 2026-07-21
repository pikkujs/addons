import { z } from 'zod'

// Define Zod schemas for API types

export const SlackResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type SlackResource = z.infer<typeof SlackResourceSchema>
