import { z } from 'zod'

// Define Zod schemas for API types

export const FreshdeskResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type FreshdeskResource = z.infer<typeof FreshdeskResourceSchema>
