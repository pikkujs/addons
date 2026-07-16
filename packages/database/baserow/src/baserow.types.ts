import { z } from 'zod'

// Define Zod schemas for API types

export const BaserowResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type BaserowResource = z.infer<typeof BaserowResourceSchema>
