import { z } from 'zod'

// Define Zod schemas for API types

export const GotifyResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GotifyResource = z.infer<typeof GotifyResourceSchema>
