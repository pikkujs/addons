import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCreateInput = z.object({
  name: z.string().describe('The name of the list'),
})

export const ListCreateOutput = z.object({
  id: z.string().describe('The unique ID of the list'),
  name: z.string().describe('The name of the list'),
  contact_count: z.number().describe('The number of contacts in the list'),
})

type Input = z.infer<typeof ListCreateInput>
type Output = z.infer<typeof ListCreateOutput>

export const listCreate = pikkuSessionlessFunc({
  description: 'Creates a new marketing list',
  node: { displayName: 'Create List', category: 'Lists', type: 'action' },
  input: ListCreateInput,
  output: ListCreateOutput,
  func: async ({ sendgrid }, data) => {
    return await sendgrid.request<Output>('POST', '/marketing/lists', { body: data as Input })
  },
})
