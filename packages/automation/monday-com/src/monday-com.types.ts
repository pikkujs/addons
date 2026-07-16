import { z } from 'zod'

// Define Zod schemas for API types

export const MondayComResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MondayComResource = z.infer<typeof MondayComResourceSchema>
