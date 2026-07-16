import { z } from 'zod'

// Define Zod schemas for API types

export const QuickbaseResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type QuickbaseResource = z.infer<typeof QuickbaseResourceSchema>
