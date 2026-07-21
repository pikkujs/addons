import { z } from 'zod'

// Define Zod schemas for API types

export const DropcontactResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type DropcontactResource = z.infer<typeof DropcontactResourceSchema>
