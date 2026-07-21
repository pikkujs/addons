import { z } from 'zod'

// Define Zod schemas for API types

export const Msg91ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Msg91Resource = z.infer<typeof Msg91ResourceSchema>
