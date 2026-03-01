import { z } from 'zod'

// Define Zod schemas for API types

export const {{ResourceName}}Schema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type {{ResourceName}} = z.infer<typeof {{ResourceName}}Schema>
