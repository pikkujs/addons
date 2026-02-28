import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const OrgGetManyInput = z.object({
  member: z
    .boolean()
    .optional()
    .describe('Restrict results to organizations which you have membership'),
  owner: z
    .boolean()
    .optional()
    .describe('Restrict results to organizations which you are the owner'),
  limit: z
    .number()
    .min(1)
    .max(500)
    .optional()
    .describe('Max number of results to return'),
})

const SentryOrganization = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  dateCreated: z.string(),
  isEarlyAdopter: z.boolean(),
  status: z.object({
    id: z.string(),
    name: z.string(),
  }),
  avatar: z.object({
    avatarType: z.string(),
    avatarUuid: z.string().nullable(),
  }),
  features: z.array(z.string()),
})

const OrgGetManyOutput = z.array(SentryOrganization)

type OutputItem = z.infer<typeof SentryOrganization>
type Output = z.infer<typeof OrgGetManyOutput>

export const sentryOrgGetMany = pikkuSessionlessFunc<
  z.infer<typeof OrgGetManyInput>,
  Output
>({
  description: 'Get many Sentry organizations',
  node: { displayName: 'Get Organizations', category: 'Organization', type: 'action' },
  func: async ({ sentry }, data) => {
    return sentry.requestAllPages<OutputItem>('GET', '/api/0/organizations/', {
      qs: {
        member: data.member,
        owner: data.owner,
      },
      limit: data.limit,
    })
  },
})
