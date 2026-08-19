import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrganizationGetOutput = z.record(z.string(), z.unknown())

export const organizationGet = pikkuSessionlessFunc({
  description: "Get my organization",
  output: OrganizationGetOutput,
  func: async ({ onfleet }) => {
    return onfleet.call("GET", "/organization") as any
  },
})
