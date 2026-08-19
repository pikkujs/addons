import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrganizationCreateInput = z.object({
  name: z.string().optional(),
})

export const OrganizationCreateOutput = z.record(z.string(), z.unknown())

export const organizationCreate = pikkuSessionlessFunc({
  description: "Create an organization",
  input: OrganizationCreateInput,
  output: OrganizationCreateOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("POST", "/organizations", data) as any
  },
})
