import { z } from 'zod'

// Define Zod schemas for API types

export const SpotifyResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type SpotifyResource = z.infer<typeof SpotifyResourceSchema>
