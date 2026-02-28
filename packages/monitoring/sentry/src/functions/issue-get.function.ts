import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const IssueGetInput = z.object({
  issueId: z.string().describe('The ID of the issue to retrieve'),
})

const IssueGetOutput = z.object({
  id: z.string(),
  shortId: z.string(),
  title: z.string(),
  culprit: z.string(),
  permalink: z.string(),
  level: z.string(),
  status: z.enum(['resolved', 'unresolved', 'ignored']),
  isPublic: z.boolean(),
  isBookmarked: z.boolean(),
  isSubscribed: z.boolean(),
  hasSeen: z.boolean(),
  count: z.string(),
  userCount: z.number(),
  firstSeen: z.string(),
  lastSeen: z.string(),
  project: z.any(),
  assignedTo: z.any().optional(),
  metadata: z.any(),
})

type Output = z.infer<typeof IssueGetOutput>

export const sentryIssueGet = pikkuSessionlessFunc({
  description: 'Get a Sentry issue by ID',
  node: { displayName: 'Get Issue', category: 'Issues', type: 'action' },
  input: IssueGetInput,
  output: IssueGetOutput,
  func: async ({ sentry }, data) => {
    return sentry.request<z.infer<typeof IssueGetOutput>>('GET', `/api/0/issues/${data.issueId}/`)
  },
})
