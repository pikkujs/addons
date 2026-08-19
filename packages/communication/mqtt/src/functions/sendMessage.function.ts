import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SendMessageInput = z.object({
  topic: z.string().optional(),
  message: z.string().optional(),
  qos: z.number().optional(),
  retain: z.boolean().optional(),
})

export const SendMessageOutput = z.record(z.string(), z.unknown())

export const sendMessage = pikkuSessionlessFunc({
  description: "Publish a message to an MQTT topic",
  input: SendMessageInput,
  output: SendMessageOutput,
  func: async ({ mqtt }, data) => {
    return mqtt.call("POST", "/publish", data) as any
  },
})
