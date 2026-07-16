import { z } from 'zod'

// Define Zod schemas for API types

export const NextcloudResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type NextcloudResource = z.infer<typeof NextcloudResourceSchema>
