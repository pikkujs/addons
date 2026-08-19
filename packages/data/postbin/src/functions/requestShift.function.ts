import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RequestShiftInput = z.object({
  binId: z.string(),
})

export const RequestShiftOutput = z.object({
  reqId: z.string().optional(),
  binId: z.string().optional(),
  method: z.string().optional(),
})

export const requestShift = pikkuSessionlessFunc({
  description: "Remove the first request from a bin",
  input: RequestShiftInput,
  output: RequestShiftOutput,
  func: async ({ postbin }, data) => {
    return postbin.call("GET", "/bin/{binId}/req/shift", data) as any
  },
})
