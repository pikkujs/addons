import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ClientGetAllOutput = z.record(z.string(), z.unknown())

export const clientGetAll = pikkuSessionlessFunc({
  description: "List clients",
  output: ClientGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/clients") as any
  },
})
