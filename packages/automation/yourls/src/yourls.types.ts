import { z } from 'zod'

// Define Zod schemas for API types

export const YourlsResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type YourlsResource = z.infer<typeof YourlsResourceSchema>
