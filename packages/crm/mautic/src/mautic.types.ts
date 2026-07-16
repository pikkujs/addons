import { z } from 'zod'

// Define Zod schemas for API types

export const MauticResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MauticResource = z.infer<typeof MauticResourceSchema>
