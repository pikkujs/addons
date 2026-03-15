import { z } from 'zod'

// Define Zod schemas for API types

export const HackernewsSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Hackernews = z.infer<typeof HackernewsSchema>
