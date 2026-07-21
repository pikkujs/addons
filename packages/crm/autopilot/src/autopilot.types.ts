import { z } from 'zod'

// Define Zod schemas for API types

export const AutopilotResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AutopilotResource = z.infer<typeof AutopilotResourceSchema>
