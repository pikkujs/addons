import { z } from 'zod'

// Define Zod schemas for API types

export const NasaResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type NasaResource = z.infer<typeof NasaResourceSchema>
