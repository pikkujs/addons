import { z } from 'zod'

// Define Zod schemas for API types

export const AwsS3ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AwsS3Resource = z.infer<typeof AwsS3ResourceSchema>
