import { z } from 'zod'

// Define Zod schemas for API types

export const UpleadResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type UpleadResource = z.infer<typeof UpleadResourceSchema>
