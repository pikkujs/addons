import { z } from 'zod'

// Define Zod schemas for API types

export const TimescaleDbResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TimescaleDbResource = z.infer<typeof TimescaleDbResourceSchema>
