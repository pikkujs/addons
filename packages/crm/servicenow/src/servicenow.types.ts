import { z } from 'zod'

// Define Zod schemas for API types

export const ServicenowResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type ServicenowResource = z.infer<typeof ServicenowResourceSchema>
