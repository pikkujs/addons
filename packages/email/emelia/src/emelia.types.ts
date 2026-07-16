import { z } from 'zod'

// Define Zod schemas for API types

export const EmeliaResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type EmeliaResource = z.infer<typeof EmeliaResourceSchema>
