import { z } from 'zod'

// Define Zod schemas for API types

export const CortexResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type CortexResource = z.infer<typeof CortexResourceSchema>
