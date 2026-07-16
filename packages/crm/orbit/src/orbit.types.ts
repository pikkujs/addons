import { z } from 'zod'

// Define Zod schemas for API types

export const OrbitResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type OrbitResource = z.infer<typeof OrbitResourceSchema>
