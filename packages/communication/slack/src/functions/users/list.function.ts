import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  limit: z.number().optional().describe('Maximum number of users to return'),
  cursor: z.string().optional().describe('Pagination cursor'),
  includeLocale: z.boolean().optional().describe('Include locale information'),
})

const outputSchema = z.object({
  ok: z.boolean(),
  members: z.array(z.object({
    id: z.string(),
    team_id: z.string(),
    name: z.string(),
    deleted: z.boolean(),
    real_name: z.string().optional(),
    profile: z.object({
      display_name: z.string(),
      real_name: z.string().optional(),
      email: z.string().optional(),
      image_72: z.string().optional(),
    }),
    is_admin: z.boolean().optional(),
    is_owner: z.boolean().optional(),
    is_bot: z.boolean(),
  })),
  response_metadata: z.object({
    next_cursor: z.string(),
  }).optional(),
})

type Output = z.infer<typeof outputSchema>

export const usersList = pikkuSessionlessFunc({
  description: 'List Slack workspace users',
  node: { displayName: 'List Users', category: 'Communication', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ slack }, data) => {
  return await slack.request('GET', 'users.list', {
    qs: {
      limit: data.limit,
      cursor: data.cursor,
      include_locale: data.includeLocale,
    },
  }) as Output
  },
})
