import { z } from 'zod'

// Define Zod schemas for API types

export const SalesforceResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type SalesforceResource = z.infer<typeof SalesforceResourceSchema>
