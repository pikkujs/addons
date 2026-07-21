import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleBooksResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleBooksResource = z.infer<typeof GoogleBooksResourceSchema>
