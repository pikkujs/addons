import { z } from 'zod'

// Define Zod schemas for API types

export const AwsTranscribeResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AwsTranscribeResource = z.infer<typeof AwsTranscribeResourceSchema>
