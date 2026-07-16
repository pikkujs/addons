import { z } from 'zod'

// Define Zod schemas for API types

export const OnfleetResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type OnfleetResource = z.infer<typeof OnfleetResourceSchema>
