import { z } from 'zod'

// Define Zod schemas for API types

export const OdooResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type OdooResource = z.infer<typeof OdooResourceSchema>
