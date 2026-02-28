import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CallbackAnswerInlineQueryInput = z.object({
  inline_query_id: z.string().describe('Unique identifier for the answered query'),
  results: z.string().describe('A JSON-serialized array of results for the inline query'),
  cache_time: z.number().optional().describe('The maximum amount of time in seconds that the result of the inline query may be cached on the server'),
  is_personal: z.boolean().optional().describe('Pass True if results may be cached on the server side only for the user that sent the query'),
  next_offset: z.string().optional().describe('Pass the offset that a client should send in the next query to receive more results'),
  button: z.object({
    text: z.string().describe('Label text on the button'),
    web_app: z.object({
      url: z.string().describe('An HTTPS URL of a Web App to be opened'),
    }).optional().describe('Description of the Web App to be opened'),
    start_parameter: z.string().optional().describe('Deep-linking parameter for the /start message'),
  }).optional().describe('Button to be shown above inline query results'),
})

export const CallbackAnswerInlineQueryOutput = z.object({
  success: z.boolean().describe('Whether the inline query was answered successfully'),
})

type Input = z.infer<typeof CallbackAnswerInlineQueryInput>

export const callbackAnswerInlineQuery = pikkuSessionlessFunc({
  description: 'Send answers to an inline query from an inline bot',
  node: { displayName: 'Answer Inline Query', category: 'Callback', type: 'action' },
  input: CallbackAnswerInlineQueryInput,
  output: CallbackAnswerInlineQueryOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('answerInlineQuery', { body: data as Input })
    return { success: true }
  },
})
