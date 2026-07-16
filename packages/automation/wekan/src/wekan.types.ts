import { z } from 'zod'

// Define Zod schemas for API types

export const WekanResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type WekanResource = z.infer<typeof WekanResourceSchema>
