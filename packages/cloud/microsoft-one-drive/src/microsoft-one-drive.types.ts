import { z } from 'zod'

// Define Zod schemas for API types

export const MicrosoftOneDriveResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MicrosoftOneDriveResource = z.infer<typeof MicrosoftOneDriveResourceSchema>
