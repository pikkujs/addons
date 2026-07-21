import { z } from 'zod'

// Define Zod schemas for API types

export const MailchimpResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MailchimpResource = z.infer<typeof MailchimpResourceSchema>
