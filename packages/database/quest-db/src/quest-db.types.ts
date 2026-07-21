import { z } from 'zod'

// Define Zod schemas for API types

export const QuestDbResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type QuestDbResource = z.infer<typeof QuestDbResourceSchema>
