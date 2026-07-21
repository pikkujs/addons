import { z } from 'zod'

// Define Zod schemas for API types

export const MailerLiteResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MailerLiteResource = z.infer<typeof MailerLiteResourceSchema>
