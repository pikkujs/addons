import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgUpdateInput = z.object({
  organizationSlug: z.string().describe('The slug of the organization to update'),
  name: z.string().optional().describe('The new name for the organization'),
  slug: z.string().optional().describe('The new unique URL slug for this organization'),
})

export const OrgUpdateOutput = z.object({
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

type Output = z.infer<typeof OrgUpdateOutput>

export const sentryOrgUpdate = pikkuSessionlessFunc<
  z.infer<typeof OrgUpdateInput>,
  Output
>({
  description: 'Update a Sentry organization',
  node: { displayName: 'Update Organization', category: 'Organization', type: 'action' },
  func: async ({ sentry }, data) => {
    const { organizationSlug, ...updateFields } = data
    return sentry.request<Output>('PUT', `/api/0/organizations/${organizationSlug}/`, {
      body: updateFields,
    })
  },
})
