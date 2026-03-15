import { z } from 'zod'

// Define Zod schemas for API types

export const HtmlExtractSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type HtmlExtract = z.infer<typeof HtmlExtractSchema>
