import { z } from 'zod'

// Define Zod schemas for API types

export const FilemakerResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type FilemakerResource = z.infer<typeof FilemakerResourceSchema>
