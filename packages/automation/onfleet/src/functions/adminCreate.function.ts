import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminCreateInput = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
})

export const AdminCreateOutput = z.record(z.string(), z.unknown())

export const adminCreate = pikkuSessionlessFunc({
  description: "Create an admin",
  input: AdminCreateInput,
  output: AdminCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/admins", data) as any
  },
})
