import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectsGetInput = z.object({
  projectId: z.string().describe('Project ID or URL-encoded path'),
})

export const ProjectsGetOutput = z.object({
  id: z.number().describe('Project ID'),
  name: z.string().describe('Project name'),
  path_with_namespace: z.string().describe('Full project path'),
  visibility: z.string().describe('Project visibility'),
  web_url: z.string().describe('Project URL'),
  description: z.string().nullable().describe('Project description'),
  default_branch: z.string().describe('Default branch'),
  star_count: z.number().describe('Star count'),
  forks_count: z.number().describe('Fork count'),
})

type Output = z.infer<typeof ProjectsGetOutput>

export const projectsGet = pikkuSessionlessFunc({
  description: 'Get a specific GitLab project',
  node: { displayName: 'Get Project', category: 'Projects', type: 'action' },
  input: ProjectsGetInput,
  output: ProjectsGetOutput,
  func: async ({ gitlab }, data) => {
    const projectId = encodeURIComponent(data.projectId)
    return await gitlab.request<Output>('GET', `/projects/${projectId}`)
  },
})
