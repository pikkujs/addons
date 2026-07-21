import { z } from 'zod'

// Define Zod schemas for API types

export const GitlabResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GitlabResource = z.infer<typeof GitlabResourceSchema>
