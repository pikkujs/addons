import { z } from 'zod'

// Define Zod schemas for API types

export const WoocommerceResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type WoocommerceResource = z.infer<typeof WoocommerceResourceSchema>
