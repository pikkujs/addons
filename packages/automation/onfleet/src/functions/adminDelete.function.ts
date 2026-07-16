import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminDeleteInput = z.object({
  adminId: z.string(),
})

export const AdminDeleteOutput = z.record(z.string(), z.unknown())

export const adminDelete = pikkuSessionlessFunc({
  description: "Delete an admin",
  input: AdminDeleteInput,
  output: AdminDeleteOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("DELETE", "/admins/{adminId}", data) as any
  },
})
