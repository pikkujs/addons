import { z } from 'zod'

// Define Zod schemas for API types

export const AsanaResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AsanaResource = z.infer<typeof AsanaResourceSchema>
