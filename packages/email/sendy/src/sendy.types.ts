import { z } from 'zod'

// Define Zod schemas for API types

export const SendyResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type SendyResource = z.infer<typeof SendyResourceSchema>
