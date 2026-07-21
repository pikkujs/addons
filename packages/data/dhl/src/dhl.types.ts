import { z } from 'zod'

// Define Zod schemas for API types

export const DhlResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type DhlResource = z.infer<typeof DhlResourceSchema>
