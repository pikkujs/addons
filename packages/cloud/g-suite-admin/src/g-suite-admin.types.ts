import { z } from 'zod'

// Define Zod schemas for API types

export const GSuiteAdminResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GSuiteAdminResource = z.infer<typeof GSuiteAdminResourceSchema>
