import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleDocsResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleDocsResource = z.infer<typeof GoogleDocsResourceSchema>
