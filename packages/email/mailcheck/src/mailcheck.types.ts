import { z } from 'zod'

// Define Zod schemas for API types

export const MailcheckResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MailcheckResource = z.infer<typeof MailcheckResourceSchema>
