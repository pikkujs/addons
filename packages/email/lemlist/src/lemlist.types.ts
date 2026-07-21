import { z } from 'zod'

// Define Zod schemas for API types

export const LemlistResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type LemlistResource = z.infer<typeof LemlistResourceSchema>
