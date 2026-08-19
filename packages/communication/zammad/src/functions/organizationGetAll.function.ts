import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrganizationGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const OrganizationGetAllOutput = z.record(z.string(), z.unknown())

export const organizationGetAll = pikkuSessionlessFunc({
  description: "Get all organizations",
  input: OrganizationGetAllInput,
  output: OrganizationGetAllOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/organizations", data) as any
  },
})
