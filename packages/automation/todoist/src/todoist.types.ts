import { z } from 'zod'

// Define Zod schemas for API types

export const TodoistResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type TodoistResource = z.infer<typeof TodoistResourceSchema>
