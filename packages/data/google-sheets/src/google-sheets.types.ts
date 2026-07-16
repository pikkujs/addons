import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleSheetsResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleSheetsResource = z.infer<typeof GoogleSheetsResourceSchema>
