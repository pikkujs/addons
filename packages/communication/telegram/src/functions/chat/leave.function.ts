import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatLeaveInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target supergroup or channel'),
})

export const ChatLeaveOutput = z.object({
  success: z.boolean().describe('Whether the bot left the chat'),
})

type Output = z.infer<typeof ChatLeaveOutput>

export const chatLeave = pikkuSessionlessFunc({
  description: 'Leave a group, supergroup or channel',
  node: { displayName: 'Leave Chat', category: 'Chat', type: 'action' },
  input: ChatLeaveInput,
  output: ChatLeaveOutput,
  func: async ({ telegram }, { chat_id }) => {
    await telegram.request<boolean>('leaveChat', { body: { chat_id } })
    return { success: true }
  },
})
