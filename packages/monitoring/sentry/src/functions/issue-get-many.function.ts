import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueGetManyInput = z.object({
  organizationSlug: z
    .string()
    .describe('The slug of the organization the issues belong to'),
  projectSlug: z
    .string()
    .describe('The slug of the project the issues belong to'),
  query: z
    .string()
    .optional()
    .describe(
      'An optional Sentry structured search query. If not provided, an implied "is:unresolved" is assumed.'
    ),
  statsPeriod: z
    .enum(['14d', '24h'])
    .optional()
    .describe('Time period of stats'),
  shortIdLookup: z
    .boolean()
    .optional()
    .describe(
      'Whether short IDs are looked up by this function as well. This can cause the return value of the function to return an event issue of a different project which is why this is an opt-in.'
    ),
  limit: z
    .number()
    .min(1)
    .max(500)
    .optional()
    .describe('Max number of results to return'),
})

export const SentryIssue = z.object({
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

export const IssueGetManyOutput = z.array(SentryIssue)

type OutputItem = z.infer<typeof SentryIssue>
type Output = z.infer<typeof IssueGetManyOutput>

export const sentryIssueGetMany = pikkuSessionlessFunc<
  z.infer<typeof IssueGetManyInput>,
  Output
>({
  description: 'Get many Sentry issues from a project',
  node: { displayName: 'Get Issues', category: 'Issues', type: 'action' },
  func: async ({ sentry }, data) => {
    return sentry.requestAllPages<OutputItem>(
      'GET',
      `/api/0/projects/${data.organizationSlug}/${data.projectSlug}/issues/`,
      {
        qs: {
          query: data.query,
          statsPeriod: data.statsPeriod,
          shortIdLookup: data.shortIdLookup,
        },
        limit: data.limit,
      }
    )
  },
})
