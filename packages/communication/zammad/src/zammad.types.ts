import { z } from 'zod'

// Define Zod schemas for API types

export const ZammadResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ZammadResource = z.infer<typeof ZammadResourceSchema>
