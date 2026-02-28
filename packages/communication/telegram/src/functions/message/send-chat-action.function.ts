import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendChatActionInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  action: z.enum([
    'typing',
    'upload_photo',
    'record_video',
    'upload_video',
    'record_voice',
    'upload_voice',
    'upload_document',
    'choose_sticker',
    'find_location',
    'record_video_note',
    'upload_video_note',
  ]).describe('Type of action to broadcast'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendChatActionOutput = z.object({
  success: z.boolean().describe('Whether the action was sent successfully'),
})

type Input = z.infer<typeof MessageSendChatActionInput>

export const messageSendChatAction = pikkuSessionlessFunc({
  description: 'Sends a chat action (typing indicator, uploading, etc.) to show bot activity',
  node: { displayName: 'Send Chat Action', category: 'Message', type: 'action' },
  input: MessageSendChatActionInput,
  output: MessageSendChatActionOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('sendChatAction', { body: data as Input })
    return { success: true }
  },
})
