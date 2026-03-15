import { z } from 'zod'

// Define Zod schemas for API types

export const HtmlSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Html = z.infer<typeof HtmlSchema>
