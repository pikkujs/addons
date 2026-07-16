import { z } from 'zod'

// Define Zod schemas for API types

export const MatrixResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type MatrixResource = z.infer<typeof MatrixResourceSchema>
