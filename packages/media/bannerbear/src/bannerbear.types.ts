import { z } from 'zod'

// Define Zod schemas for API types

export const BannerbearResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type BannerbearResource = z.infer<typeof BannerbearResourceSchema>
