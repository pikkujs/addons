import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  projectId: z.string().describe('Project ID'),
  limit: z.number().optional().describe('Number of results to return'),
})

const outputSchema = z.object({
  results: z.array(z.object({
    id: z.number(),
    distinct_ids: z.array(z.string()),
    properties: z.record(z.string(), z.unknown()),
    created_at: z.string(),
  })),
  next: z.string().nullable(),
})

type Input = z.infer<typeof inputSchema>
type Output = z.infer<typeof outputSchema>

export const personsList = pikkuSessionlessFunc({
  description: 'List persons in PostHog',
  node: { displayName: 'List Persons', category: 'Analytics', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ posthog }, data) => {
    return await posthog.request('GET', `projects/${data.projectId}/persons`, {
      qs: { limit: data.limit },
    }) as Output
  },
})
