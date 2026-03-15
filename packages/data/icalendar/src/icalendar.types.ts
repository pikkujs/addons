import { z } from 'zod'

// Define Zod schemas for API types

export const IcalendarSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Icalendar = z.infer<typeof IcalendarSchema>
