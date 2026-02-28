import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatSetTitleInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  title: z.string().min(1).max(255).describe('New chat title, 1-255 characters'),
})

export const ChatSetTitleOutput = z.object({
  success: z.boolean().describe('Whether the title was set successfully'),
})

type Input = z.infer<typeof ChatSetTitleInput>

export const chatSetTitle = pikkuSessionlessFunc({
  description: 'Change the title of a group, supergroup or channel',
  node: { displayName: 'Set Chat Title', category: 'Chat', type: 'action' },
  input: ChatSetTitleInput,
  output: ChatSetTitleOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('setChatTitle', { body: data as Input })
    return { success: true }
  },
})
