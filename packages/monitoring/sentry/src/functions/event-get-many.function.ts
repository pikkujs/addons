import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EventGetManyInput = z.object({
  organizationSlug: z
    .string()
    .describe('The slug of the organization the events belong to'),
  projectSlug: z
    .string()
    .describe('The slug of the project the events belong to'),
  full: z
    .boolean()
    .optional()
    .describe(
      'Whether the event payload will include the full event body, including the stack trace'
    ),
  limit: z
    .number()
    .min(1)
    .max(500)
    .optional()
    .describe('Max number of results to return'),
})

export const SentryEvent = z.object({
  eventID: z.string(),
  id: z.string(),
  message: z.string(),
  title: z.string(),
  dateCreated: z.string(),
  platform: z.string().optional(),
  groupID: z.string().optional(),
  tags: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
})

export const EventGetManyOutput = z.array(SentryEvent)

type OutputItem = z.infer<typeof SentryEvent>
type Output = z.infer<typeof EventGetManyOutput>

export const sentryEventGetMany = pikkuSessionlessFunc<
  z.infer<typeof EventGetManyInput>,
  Output
>({
  description: 'Get many Sentry events from a project',
  node: { displayName: 'Get Events', category: 'Events', type: 'action' },
  func: async ({ sentry }, data) => {
    return sentry.requestAllPages<OutputItem>(
      'GET',
      `/api/0/projects/${data.organizationSlug}/${data.projectSlug}/events/`,
      {
        qs: {
          full: data.full,
        },
        limit: data.limit,
      }
    )
  },
})
