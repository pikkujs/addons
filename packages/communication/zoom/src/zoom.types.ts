import { z } from 'zod'

// Define Zod schemas for API types

export const ZoomResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ZoomResource = z.infer<typeof ZoomResourceSchema>
