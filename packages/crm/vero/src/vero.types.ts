import { z } from 'zod'

// Define Zod schemas for API types

export const VeroResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type VeroResource = z.infer<typeof VeroResourceSchema>
