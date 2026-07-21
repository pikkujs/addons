import { z } from 'zod'

// Define Zod schemas for API types

export const MicrosoftTeamsResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MicrosoftTeamsResource = z.infer<typeof MicrosoftTeamsResourceSchema>
