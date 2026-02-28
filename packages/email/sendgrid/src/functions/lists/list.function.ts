import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListListInput = z.object({
  page_size: z.number().optional().describe('Number of results to return per page'),
  page_token: z.string().optional().describe('Token for pagination'),
})

const ListItemSchema = z.object({
  id: z.string().describe('The unique ID of the list'),
  name: z.string().describe('The name of the list'),
  contact_count: z.number().describe('The number of contacts in the list'),
})

export const ListListOutput = z.object({
  result: z.array(ListItemSchema).describe('Array of lists'),
  _metadata: z.object({
    self: z.string().optional().describe('Link to current page'),
    next: z.string().optional().describe('Link to next page'),
  }).optional().describe('Pagination metadata'),
})

type Output = z.infer<typeof ListListOutput>

export const listList = pikkuSessionlessFunc({
  description: 'Retrieves all marketing lists',
  node: { displayName: 'List All Lists', category: 'Lists', type: 'action' },
  input: ListListInput,
  output: ListListOutput,
  func: async ({ sendgrid }, { page_size, page_token }) => {
    return await sendgrid.request<Output>('GET', '/marketing/lists', {
      qs: { page_size, page_token },
    })
  },
})
