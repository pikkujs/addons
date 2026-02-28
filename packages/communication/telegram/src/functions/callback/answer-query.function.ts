import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CallbackAnswerQueryInput = z.object({
  callback_query_id: z.string().describe('Unique identifier for the query to be answered'),
  text: z.string().optional().describe('Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters'),
  show_alert: z.boolean().optional().describe('If True, an alert will be shown by the client instead of a notification at the top of the chat screen'),
  url: z.string().optional().describe("URL that will be opened by the user's client"),
  cache_time: z.number().optional().describe('The maximum amount of time in seconds that the result of the callback query may be cached client-side'),
})

export const CallbackAnswerQueryOutput = z.object({
  success: z.boolean().describe('Whether the callback query was answered successfully'),
})

type Input = z.infer<typeof CallbackAnswerQueryInput>

export const callbackAnswerQuery = pikkuSessionlessFunc({
  description: 'Send an answer to a callback query sent from an inline keyboard',
  node: { displayName: 'Answer Callback Query', category: 'Callback', type: 'action' },
  input: CallbackAnswerQueryInput,
  output: CallbackAnswerQueryOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('answerCallbackQuery', { body: data as Input })
    return { success: true }
  },
})
