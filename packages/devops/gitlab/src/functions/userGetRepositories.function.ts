import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetRepositoriesInput = z.object({
  owner: z.string(),
})

export const UserGetRepositoriesOutput = z.record(z.string(), z.unknown())

export const userGetRepositories = pikkuSessionlessFunc({
  description: "Get a user's repositories",
  input: UserGetRepositoriesInput,
  output: UserGetRepositoriesOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/users/{owner}/projects", data) as any
  },
})
