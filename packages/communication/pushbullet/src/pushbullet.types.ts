import { z } from 'zod'

// Define Zod schemas for API types

export const PushbulletResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type PushbulletResource = z.infer<typeof PushbulletResourceSchema>
