import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleDriveResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleDriveResource = z.infer<typeof GoogleDriveResourceSchema>
