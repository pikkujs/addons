import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const EventGetInput = z.object({
  organizationSlug: z
    .string()
    .describe('The slug of the organization the events belong to'),
  projectSlug: z
    .string()
    .describe('The slug of the project the events belong to'),
  eventId: z
    .string()
    .describe(
      'The ID of the event to retrieve (either the numeric primary-key or the hexadecimal ID as reported by the raven client)'
    ),
})

const EventGetOutput = z.object({
  eventID: z.string(),
  context: z.any().optional(),
  contexts: z.any().optional(),
  dateCreated: z.string(),
  dateReceived: z.string(),
  entries: z.array(z.any()),
  errors: z.array(z.any()),
  fingerprints: z.array(z.string()),
  groupID: z.string().optional(),
  id: z.string(),
  message: z.string(),
  metadata: z.any(),
  platform: z.string(),
  sdk: z.any().optional(),
  tags: z.array(z.object({ key: z.string(), value: z.string() })),
  title: z.string(),
  type: z.string(),
  user: z.any().optional(),
})

type Output = z.infer<typeof EventGetOutput>

export const sentryEventGet = pikkuSessionlessFunc({
  description: 'Get a Sentry event by ID',
  node: { displayName: 'Get Event', category: 'Events', type: 'action' },
  input: EventGetInput,
  output: EventGetOutput,
  func: async ({ sentry }, data) => {
    return sentry.request<z.infer<typeof EventGetOutput>>(
      'GET',
      `/api/0/projects/${data.organizationSlug}/${data.projectSlug}/events/${data.eventId}/`
    )
  },
})
