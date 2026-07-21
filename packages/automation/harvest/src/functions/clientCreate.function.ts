import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ClientCreateInput = z.object({
  name: z.string().optional(),
})

export const ClientCreateOutput = z.record(z.string(), z.unknown())

export const clientCreate = pikkuSessionlessFunc({
  description: "Create client",
  input: ClientCreateInput,
  output: ClientCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/clients", data) as any
  },
})
