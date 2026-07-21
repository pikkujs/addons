import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ClientGetInput = z.object({
  id: z.string(),
})

export const ClientGetOutput = z.record(z.string(), z.unknown())

export const clientGet = pikkuSessionlessFunc({
  description: "Client get",
  input: ClientGetInput,
  output: ClientGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/clients/{id}", data) as any
  },
})
