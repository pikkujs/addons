import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleFirebaseCloudFirestoreResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleFirebaseCloudFirestoreResource = z.infer<typeof GoogleFirebaseCloudFirestoreResourceSchema>
