import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectsListInput = z.object({
  owned: z.boolean().optional().describe('Limit to owned projects'),
  membership: z.boolean().optional().describe('Limit to projects with membership'),
  visibility: z.enum(['public', 'internal', 'private']).optional().describe('Project visibility'),
  per_page: z.number().optional().describe('Results per page (max 100)'),
})

export const ProjectsListOutput = z.array(z.object({
  id: z.number().describe('Project ID'),
  name: z.string().describe('Project name'),
  path_with_namespace: z.string().describe('Full project path'),
  visibility: z.string().describe('Project visibility'),
  web_url: z.string().describe('Project URL'),
  description: z.string().nullable().describe('Project description'),
}))

type Output = z.infer<typeof ProjectsListOutput>

export const projectsList = pikkuSessionlessFunc({
  description: 'List GitLab projects',
  node: { displayName: 'List Projects', category: 'Projects', type: 'action' },
  input: ProjectsListInput,
  output: ProjectsListOutput,
  func: async ({ gitlab }, data) => {
    return await gitlab.request<Output>('GET', '/projects', { qs: data })
  },
})
