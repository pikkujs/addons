import { z } from 'zod'

// Define Zod schemas for API types

export const RaindropResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type RaindropResource = z.infer<typeof RaindropResourceSchema>
