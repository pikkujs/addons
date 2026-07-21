import { z } from 'zod'

// Define Zod schemas for API types

export const OpenWeatherMapResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type OpenWeatherMapResource = z.infer<typeof OpenWeatherMapResourceSchema>
