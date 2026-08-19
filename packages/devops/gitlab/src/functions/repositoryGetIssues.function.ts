import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RepositoryGetIssuesInput = z.object({
  projectId: z.string(),
  state: z.string().optional(),
  search: z.string().optional(),
  per_page: z.number().int().optional(),
})

export const RepositoryGetIssuesOutput = z.record(z.string(), z.unknown())

export const repositoryGetIssues = pikkuSessionlessFunc({
  description: "Get issues of a repository",
  input: RepositoryGetIssuesInput,
  output: RepositoryGetIssuesOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}/issues", data) as any
  },
})
