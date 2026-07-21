import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RequestSendInput = z.object({
  binId: z.string(),
  content: z.string().optional(),
})

export const RequestSendOutput = z.object({
  requestId: z.string().optional(),
})

export const requestSend = pikkuSessionlessFunc({
  description: "Send a test request to the bin",
  input: RequestSendInput,
  output: RequestSendOutput,
  func: async ({ postbin }, data) => {
    return postbin.call("POST", "/bin/{binId}/send", data) as any
  },
})
