import { z } from 'zod'

// Define Zod schemas for API types

export const SecurityScorecardResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type SecurityScorecardResource = z.infer<typeof SecurityScorecardResourceSchema>
