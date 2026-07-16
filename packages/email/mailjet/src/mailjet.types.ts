import { z } from 'zod'

// Define Zod schemas for API types

export const MailjetResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MailjetResource = z.infer<typeof MailjetResourceSchema>
