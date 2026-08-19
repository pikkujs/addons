import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrganizationDeleteInput = z.object({
  id: z.string(),
})

export const OrganizationDeleteOutput = z.record(z.string(), z.unknown())

export const organizationDelete = pikkuSessionlessFunc({
  description: "Delete an organization",
  input: OrganizationDeleteInput,
  output: OrganizationDeleteOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("DELETE", "/organizations/{id}", data) as any
  },
})
