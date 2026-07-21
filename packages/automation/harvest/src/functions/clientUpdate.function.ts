import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ClientUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export const ClientUpdateOutput = z.record(z.string(), z.unknown())

export const clientUpdate = pikkuSessionlessFunc({
  description: "Client update",
  input: ClientUpdateInput,
  output: ClientUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/clients/{id}", data) as any
  },
})
