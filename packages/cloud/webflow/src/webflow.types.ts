import { z } from 'zod'

// Define Zod schemas for API types

export const WebflowResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type WebflowResource = z.infer<typeof WebflowResourceSchema>
