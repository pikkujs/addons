import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgGetInput = z.object({
  organizationSlug: z.string().describe('The slug of the organization to retrieve'),
})

export const SentryOrganization = z.object({
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

export const sentryOrgGet = pikkuSessionlessFunc({
  description: 'Get a Sentry organization by slug',
  node: { displayName: 'Get Organization', category: 'Organizations', type: 'action' },
  input: OrgGetInput,
  output: SentryOrganization,
  func: async ({ sentry }, data) => {
    return sentry.request<z.infer<typeof SentryOrganization>>('GET', `/api/0/organizations/${data.organizationSlug}/`)
  },
})
