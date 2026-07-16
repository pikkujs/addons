import { z } from 'zod'

// Define Zod schemas for API types

export const ConvertkitResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ConvertkitResource = z.infer<typeof ConvertkitResourceSchema>
