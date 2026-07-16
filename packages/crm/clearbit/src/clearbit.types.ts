import { z } from 'zod'

// Define Zod schemas for API types

export const ClearbitResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ClearbitResource = z.infer<typeof ClearbitResourceSchema>
