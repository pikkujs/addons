import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrganizationUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export const OrganizationUpdateOutput = z.record(z.string(), z.unknown())

export const organizationUpdate = pikkuSessionlessFunc({
  description: "Update an organization",
  input: OrganizationUpdateInput,
  output: OrganizationUpdateOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("PUT", "/organizations/{id}", data) as any
  },
})
