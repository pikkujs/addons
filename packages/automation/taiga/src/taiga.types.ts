import { z } from 'zod'

// Define Zod schemas for API types

export const TaigaResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TaigaResource = z.infer<typeof TaigaResourceSchema>
