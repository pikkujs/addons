import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageUnpinInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  message_id: z.number().optional().describe('Identifier of a message to unpin. If not specified, the most recent pinned message will be unpinned'),
})

export const MessageUnpinOutput = z.object({
  success: z.boolean().describe('Whether the message was unpinned successfully'),
})

type Input = z.infer<typeof MessageUnpinInput>

export const messageUnpin = pikkuSessionlessFunc({
  description: 'Unpins a message in a chat',
  node: { displayName: 'Unpin Message', category: 'Message', type: 'action' },
  input: MessageUnpinInput,
  output: MessageUnpinOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('unpinChatMessage', { body: data as Input })
    return { success: true }
  },
})
