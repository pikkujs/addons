import { z } from 'zod'

// Define Zod schemas for API types

export const NocodbResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type NocodbResource = z.infer<typeof NocodbResourceSchema>
