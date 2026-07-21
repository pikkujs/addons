import { z } from 'zod'

// Define Zod schemas for API types

export const QuickbooksResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type QuickbooksResource = z.infer<typeof QuickbooksResourceSchema>
