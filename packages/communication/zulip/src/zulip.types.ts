import { z } from 'zod'

// Define Zod schemas for API types

export const ZulipResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ZulipResource = z.infer<typeof ZulipResourceSchema>
