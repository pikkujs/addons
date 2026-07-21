import { z } from 'zod'

// Define Zod schemas for API types

export const MoceanResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MoceanResource = z.infer<typeof MoceanResourceSchema>
