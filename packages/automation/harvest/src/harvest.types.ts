import { z } from 'zod'

// Define Zod schemas for API types

export const HarvestResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type HarvestResource = z.infer<typeof HarvestResourceSchema>
