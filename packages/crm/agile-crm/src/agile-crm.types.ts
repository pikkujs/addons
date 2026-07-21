import { z } from 'zod'

// Define Zod schemas for API types

export const AgileCrmResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AgileCrmResource = z.infer<typeof AgileCrmResourceSchema>
