import { z } from 'zod'

// Define Zod schemas for API types

export const SnowflakeResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type SnowflakeResource = z.infer<typeof SnowflakeResourceSchema>
