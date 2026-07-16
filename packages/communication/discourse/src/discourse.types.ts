import { z } from 'zod'

// Define Zod schemas for API types

export const DiscourseResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type DiscourseResource = z.infer<typeof DiscourseResourceSchema>
