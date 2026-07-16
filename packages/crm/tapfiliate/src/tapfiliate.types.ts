import { z } from 'zod'

// Define Zod schemas for API types

export const TapfiliateResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TapfiliateResource = z.infer<typeof TapfiliateResourceSchema>
