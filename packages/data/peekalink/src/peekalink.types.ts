import { z } from 'zod'

// Define Zod schemas for API types

export const PeekalinkResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type PeekalinkResource = z.infer<typeof PeekalinkResourceSchema>
