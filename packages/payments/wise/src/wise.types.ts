import { z } from 'zod'

// Define Zod schemas for API types

export const WiseResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type WiseResource = z.infer<typeof WiseResourceSchema>
