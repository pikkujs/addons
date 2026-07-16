import { z } from 'zod'

// Define Zod schemas for API types

export const MindeeResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MindeeResource = z.infer<typeof MindeeResourceSchema>
