import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleFirebaseRealtimeDatabaseResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleFirebaseRealtimeDatabaseResource = z.infer<typeof GoogleFirebaseRealtimeDatabaseResourceSchema>
