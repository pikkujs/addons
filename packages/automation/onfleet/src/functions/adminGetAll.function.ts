import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminGetAllOutput = z.record(z.string(), z.unknown())

export const adminGetAll = pikkuSessionlessFunc({
  description: "Get many admins",
  output: AdminGetAllOutput,
  func: async ({ onfleet }) => {
    return onfleet.call("GET", "/admins") as any
  },
})
