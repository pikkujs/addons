import { z } from 'zod'

// Define Zod schemas for API types

export const TheHiveResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TheHiveResource = z.infer<typeof TheHiveResourceSchema>
