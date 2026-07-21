import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BinDeleteInput = z.object({
  binId: z.string(),
})

export const BinDeleteOutput = z.object({
  binId: z.string().optional(),
})

export const binDelete = pikkuSessionlessFunc({
  description: "Delete a bin",
  input: BinDeleteInput,
  output: BinDeleteOutput,
  func: async ({ postbin }, data) => {
    return postbin.call("DELETE", "/bin/{binId}", data) as any
  },
})
