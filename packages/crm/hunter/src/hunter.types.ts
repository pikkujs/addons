import { z } from 'zod'

// Define Zod schemas for API types

export const HunterResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type HunterResource = z.infer<typeof HunterResourceSchema>
