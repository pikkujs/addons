import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BinCreateOutput = z.object({
  binId: z.string().optional(),
  now: z.number().optional(),
  expires: z.number().optional(),
})

export const binCreate = pikkuSessionlessFunc({
  description: "Create a bin",
  output: BinCreateOutput,
  func: async ({ postbin }) => {
    return postbin.call("POST", "/bin") as any
  },
})
