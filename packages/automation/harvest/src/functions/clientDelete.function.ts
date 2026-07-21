import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ClientDeleteInput = z.object({
  id: z.string(),
})

export const ClientDeleteOutput = z.record(z.string(), z.unknown())

export const clientDelete = pikkuSessionlessFunc({
  description: "Client delete",
  input: ClientDeleteInput,
  output: ClientDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/clients/{id}", data) as any
  },
})
