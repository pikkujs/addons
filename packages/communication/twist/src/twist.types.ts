import { z } from 'zod'

// Define Zod schemas for API types

export const TwistResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TwistResource = z.infer<typeof TwistResourceSchema>
