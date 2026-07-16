import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendInput = z.object({
  roomId: z.string(),
  txnId: z.string(),
  msgtype: z.string().optional(),
  body: z.string().optional(),
  format: z.string().optional(),
  formatted_body: z.string().optional(),
})

export const MessageSendOutput = z.object({
  event_id: z.string().optional(),
})

export const messageSend = pikkuSessionlessFunc({
  description: "Send a message to a room",
  input: MessageSendInput,
  output: MessageSendOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("PUT", "/rooms/{roomId}/send/m.room.message/{txnId}", data) as any
  },
})
