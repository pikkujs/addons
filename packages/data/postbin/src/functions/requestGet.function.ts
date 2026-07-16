import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RequestGetInput = z.object({
  binId: z.string(),
  requestId: z.string(),
})

export const RequestGetOutput = z.object({
  reqId: z.string().optional(),
  binId: z.string().optional(),
  method: z.string().optional(),
})

export const requestGet = pikkuSessionlessFunc({
  description: "Get a request",
  input: RequestGetInput,
  output: RequestGetOutput,
  func: async ({ postbin }, data) => {
    return postbin.call("GET", "/bin/{binId}/req/{requestId}", data) as any
  },
})
