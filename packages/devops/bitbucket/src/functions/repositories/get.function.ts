import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  workspace: z.string().describe('Workspace slug or UUID'),
  repoSlug: z.string().describe('Repository slug'),
})

const outputSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  is_private: z.boolean(),
  created_on: z.string(),
  updated_on: z.string(),
  language: z.string(),
  size: z.number(),
  mainbranch: z.object({
    name: z.string(),
    type: z.string(),
  }).optional(),
  owner: z.object({
    display_name: z.string(),
    uuid: z.string(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const repositoriesGet = pikkuSessionlessFunc({
  description: 'Get details of a specific repository',
  node: { displayName: 'Get Repository', category: 'Repositories', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ bitbucket }, data) => {
  return await bitbucket.request('GET', `repositories/${data.workspace}/${data.repoSlug}`) as Output
  },
})
