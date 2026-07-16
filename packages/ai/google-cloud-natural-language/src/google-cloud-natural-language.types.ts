import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleCloudNaturalLanguageResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleCloudNaturalLanguageResource = z.infer<typeof GoogleCloudNaturalLanguageResourceSchema>
