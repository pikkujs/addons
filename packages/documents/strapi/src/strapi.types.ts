import { z } from 'zod'

// Define Zod schemas for API types

export const StrapiResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type StrapiResource = z.infer<typeof StrapiResourceSchema>
