import { z } from 'zod'

// Define Zod schemas for API types

export const AmqpResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AmqpResource = z.infer<typeof AmqpResourceSchema>
