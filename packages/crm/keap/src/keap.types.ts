import { z } from 'zod'

// Define Zod schemas for API types

export const KeapResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type KeapResource = z.infer<typeof KeapResourceSchema>
