import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonsListInput = z.object({
  projectId: z.string().describe('Project ID'),
  limit: z.number().optional().describe('Number of results to return'),
})

export const PersonsListOutput = z.object({
  results: z.array(z.object({
    id: z.number(),
    distinct_ids: z.array(z.string()),
    properties: z.record(z.string(), z.unknown()),
    created_at: z.string(),
  })),
  next: z.string().nullable(),
})

type Input = z.infer<typeof PersonsListInput>
type Output = z.infer<typeof PersonsListOutput>

export const personsList = pikkuSessionlessFunc({
  description: 'List persons in PostHog',
  node: { displayName: 'List Persons', category: 'Analytics', type: 'action' },
  input: PersonsListInput,
  output: PersonsListOutput,
  func: async ({ posthog }, data) => {
    return await posthog.request('GET', `projects/${data.projectId}/persons`, {
      qs: { limit: data.limit },
    }) as Output
  },
})
