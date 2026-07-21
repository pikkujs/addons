import { z } from 'zod'

// Define Zod schemas for API types

export const MicrosoftOutlookResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MicrosoftOutlookResource = z.infer<typeof MicrosoftOutlookResourceSchema>
