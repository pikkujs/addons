import { z } from 'zod'

// Define Zod schemas for API types

export const CratedbResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type CratedbResource = z.infer<typeof CratedbResourceSchema>
