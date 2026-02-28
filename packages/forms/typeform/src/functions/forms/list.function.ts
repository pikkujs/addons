import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  page: z.number().optional().describe('Page number'),
  pageSize: z.number().optional().describe('Number of results per page'),
  search: z.string().optional().describe('Search query'),
  workspaceId: z.string().optional().describe('Workspace ID to filter by'),
})

const outputSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    last_updated_at: z.string(),
    created_at: z.string(),
    self: z.object({
      href: z.string(),
    }),
    theme: z.object({
      href: z.string(),
    }).optional(),
    _links: z.object({
      display: z.string(),
    }),
  })),
  page_count: z.number(),
  total_items: z.number(),
})

type Output = z.infer<typeof outputSchema>

export const formsList = pikkuSessionlessFunc({
  description: 'List all Typeform forms',
  node: { displayName: 'List Forms', category: 'Forms', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ typeform }, data) => {
  return await typeform.request('GET', 'forms', {
    qs: {
      page: data.page,
      page_size: data.pageSize,
      search: data.search,
      workspace_id: data.workspaceId,
    },
  }) as Output
  },
})
