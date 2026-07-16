import { z } from 'zod'

// Define Zod schemas for API types

export const TrelloResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TrelloResource = z.infer<typeof TrelloResourceSchema>
