import { z } from 'zod'

// Define Zod schemas for API types

export const ElasticsearchResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ElasticsearchResource = z.infer<typeof ElasticsearchResourceSchema>
