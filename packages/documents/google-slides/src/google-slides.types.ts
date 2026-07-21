import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleSlidesResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleSlidesResource = z.infer<typeof GoogleSlidesResourceSchema>
