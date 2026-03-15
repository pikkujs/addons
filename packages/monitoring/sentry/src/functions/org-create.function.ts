import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgCreateInput = z.object({
  name: z.string().describe('The human readable name for the new organization'),
  slug: z.string().optional().describe('The unique URL slug for this organization'),
  agreeTerms: z
    .boolean()
    .optional()
    .describe('Signifies agreement to the terms of service'),
})

export const OrgCreateOutput = z.object({
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

type Output = z.infer<typeof OrgCreateOutput>

export const sentryOrgCreate = pikkuSessionlessFunc({
  description: 'Create a new Sentry organization',
  node: { displayName: 'Create Organization', category: 'Organizations', type: 'action' },
  input: OrgCreateInput,
  output: OrgCreateOutput,
  func: async ({ sentry }, data) => {
    return sentry.request<z.infer<typeof OrgCreateOutput>>('POST', '/api/0/organizations/', {
      body: {
        name: data.name,
        slug: data.slug,
        agreeTerms: data.agreeTerms,
      },
    })
  },
})
