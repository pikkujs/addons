import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RepositoryGetInput = z.object({
  projectId: z.string(),
})

export const RepositoryGetOutput = z.record(z.string(), z.unknown())

export const repositoryGet = pikkuSessionlessFunc({
  description: "Get a repository",
  input: RepositoryGetInput,
  output: RepositoryGetOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}", data) as any
  },
})
