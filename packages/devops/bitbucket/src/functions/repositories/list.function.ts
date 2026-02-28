import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  workspace: z.string().describe('Workspace slug or UUID'),
  page: z.number().optional().describe('Page number'),
  pagelen: z.number().optional().describe('Results per page (max 100)'),
  sort: z.string().optional().describe('Sort field'),
  q: z.string().optional().describe('Query filter'),
})

const outputSchema = z.object({
  size: z.number(),
  page: z.number(),
  pagelen: z.number(),
  values: z.array(z.object({
    uuid: z.string(),
    name: z.string(),
    full_name: z.string(),
    description: z.string().nullable(),
    is_private: z.boolean(),
    created_on: z.string(),
    updated_on: z.string(),
    language: z.string(),
    mainbranch: z.object({
      name: z.string(),
      type: z.string(),
    }).optional(),
  })),
  next: z.string().optional(),
  previous: z.string().optional(),
})

type Output = z.infer<typeof outputSchema>

export const repositoriesList = pikkuSessionlessFunc({
  description: 'List repositories in a workspace',
  node: { displayName: 'List Repositories', category: 'Repositories', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ bitbucket }, data) => {
  return await bitbucket.request('GET', `repositories/${data.workspace}`, {
    qs: {
      page: data.page,
      pagelen: data.pagelen,
      sort: data.sort,
      q: data.q,
    },
  }) as Output
  },
})
