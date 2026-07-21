import { z } from 'zod'

// Define Zod schemas for API types

export const QuickchartResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type QuickchartResource = z.infer<typeof QuickchartResourceSchema>
