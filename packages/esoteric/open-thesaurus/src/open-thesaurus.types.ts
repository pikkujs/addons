import { z } from 'zod'

// Define Zod schemas for API types

export const OpenThesaurusResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type OpenThesaurusResource = z.infer<typeof OpenThesaurusResourceSchema>
