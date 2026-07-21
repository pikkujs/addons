import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleTasksResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleTasksResource = z.infer<typeof GoogleTasksResourceSchema>
