import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUpdateInput = z.object({
  adminId: z.string(),
  name: z.string().optional(),
})

export const AdminUpdateOutput = z.record(z.string(), z.unknown())

export const adminUpdate = pikkuSessionlessFunc({
  description: "Update an admin",
  input: AdminUpdateInput,
  output: AdminUpdateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/admins/{adminId}", data) as any
  },
})
