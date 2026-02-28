import { z } from 'zod'

export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Resource = z.infer<typeof ResourceSchema>
