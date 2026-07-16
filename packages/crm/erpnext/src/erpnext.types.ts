import { z } from 'zod'

// Define Zod schemas for API types

export const ErpnextResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ErpnextResource = z.infer<typeof ErpnextResourceSchema>
