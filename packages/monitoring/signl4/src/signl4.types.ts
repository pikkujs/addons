import { z } from 'zod'

// Define Zod schemas for API types

export const Signl4ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Signl4Resource = z.infer<typeof Signl4ResourceSchema>
