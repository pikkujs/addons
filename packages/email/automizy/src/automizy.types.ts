import { z } from 'zod'

// Define Zod schemas for API types

export const AutomizyResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type AutomizyResource = z.infer<typeof AutomizyResourceSchema>
