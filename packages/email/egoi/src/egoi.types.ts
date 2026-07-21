import { z } from 'zod'

// Define Zod schemas for API types

export const EgoiResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type EgoiResource = z.infer<typeof EgoiResourceSchema>
