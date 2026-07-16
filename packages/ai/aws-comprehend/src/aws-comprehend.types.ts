import { z } from 'zod'

// Define Zod schemas for API types

export const AwsComprehendResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AwsComprehendResource = z.infer<typeof AwsComprehendResourceSchema>
