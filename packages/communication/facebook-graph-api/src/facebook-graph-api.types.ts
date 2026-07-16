import { z } from 'zod'

// Define Zod schemas for API types

export const FacebookGraphApiResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type FacebookGraphApiResource = z.infer<typeof FacebookGraphApiResourceSchema>
