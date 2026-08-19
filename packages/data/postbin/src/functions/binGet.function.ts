import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BinGetInput = z.object({
  binId: z.string(),
})

export const BinGetOutput = z.object({
  binId: z.string().optional(),
  now: z.number().optional(),
  expires: z.number().optional(),
})

export const binGet = pikkuSessionlessFunc({
  description: "Get a bin",
  input: BinGetInput,
  output: BinGetOutput,
  func: async ({ postbin }, data) => {
    return postbin.call("GET", "/bin/{binId}", data) as any
  },
})
