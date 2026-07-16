import { z } from 'zod'

// Define Zod schemas for API types

export const NotionResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type NotionResource = z.infer<typeof NotionResourceSchema>
