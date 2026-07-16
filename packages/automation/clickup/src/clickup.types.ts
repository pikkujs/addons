import { z } from 'zod'

// Define Zod schemas for API types

export const ClickupResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ClickupResource = z.infer<typeof ClickupResourceSchema>
