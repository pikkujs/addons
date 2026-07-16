import { z } from 'zod'

// Define Zod schemas for API types

export const AwsLambdaResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AwsLambdaResource = z.infer<typeof AwsLambdaResourceSchema>
