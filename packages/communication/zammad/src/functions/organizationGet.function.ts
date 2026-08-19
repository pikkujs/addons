import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrganizationGetInput = z.object({
  id: z.string(),
})

export const OrganizationGetOutput = z.record(z.string(), z.unknown())

export const organizationGet = pikkuSessionlessFunc({
  description: "Get an organization",
  input: OrganizationGetInput,
  output: OrganizationGetOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/organizations/{id}", data) as any
  },
})
