import { z } from 'zod'

// Define Zod schemas for API types

export const GoogleCalendarResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type GoogleCalendarResource = z.infer<typeof GoogleCalendarResourceSchema>
