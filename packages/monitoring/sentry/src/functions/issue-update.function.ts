import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueUpdateInput = z.object({
  issueId: z.string().describe('The ID of the issue to update'),
  status: z
    .enum(['resolved', 'unresolved', 'ignored'])
    .optional()
    .describe('The new status for the issue'),
  assignedTo: z
    .string()
    .optional()
    .describe('The actor ID (or username) of the user or team to assign the issue to'),
  hasSeen: z.boolean().optional().describe('Mark if the issue has been seen'),
  isBookmarked: z.boolean().optional().describe('Mark if the issue is bookmarked'),
  isSubscribed: z.boolean().optional().describe('Mark if subscribed to issue notifications'),
  isPublic: z.boolean().optional().describe('Make the issue public or private'),
})

export const IssueUpdateOutput = z.object({
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

type Output = z.infer<typeof IssueUpdateOutput>

export const sentryIssueUpdate = pikkuSessionlessFunc({
  description: 'Update a Sentry issue',
  node: { displayName: 'Update Issue', category: 'Issues', type: 'action' },
  input: IssueUpdateInput,
  output: IssueUpdateOutput,
  func: async ({ sentry }, data) => {
    const { issueId, ...updateFields } = data
    return sentry.request<z.infer<typeof IssueUpdateOutput>>('PUT', `/api/0/issues/${issueId}/`, {
      body: updateFields,
    })
  },
})
