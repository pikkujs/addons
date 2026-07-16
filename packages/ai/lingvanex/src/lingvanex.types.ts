import { z } from 'zod'

// Define Zod schemas for API types

export const LingvanexResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type LingvanexResource = z.infer<typeof LingvanexResourceSchema>
