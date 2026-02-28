import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatSetDescriptionInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  description: z.string().max(255).describe('New chat description, 0-255 characters'),
})

export const ChatSetDescriptionOutput = z.object({
  success: z.boolean().describe('Whether the description was set successfully'),
})

type Input = z.infer<typeof ChatSetDescriptionInput>

export const chatSetDescription = pikkuSessionlessFunc({
  description: 'Change the description of a group, supergroup or channel',
  node: { displayName: 'Set Chat Description', category: 'Chat', type: 'action' },
  input: ChatSetDescriptionInput,
  output: ChatSetDescriptionOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('setChatDescription', { body: data as Input })
    return { success: true }
  },
})
