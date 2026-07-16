import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrganizationGetDelegateeInput = z.object({
  organizationId: z.string(),
})

export const OrganizationGetDelegateeOutput = z.record(z.string(), z.unknown())

export const organizationGetDelegatee = pikkuSessionlessFunc({
  description: "Get a delegatee organization",
  input: OrganizationGetDelegateeInput,
  output: OrganizationGetDelegateeOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/organizations/{organizationId}", data) as any
  },
})
