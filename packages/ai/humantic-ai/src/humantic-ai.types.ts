import { z } from 'zod'

// Define Zod schemas for API types

export const HumanticAiResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type HumanticAiResource = z.infer<typeof HumanticAiResourceSchema>
