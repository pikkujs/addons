import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  workspaceId: z.string(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "User get all",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/workspaces/{workspaceId}/users", data) as any
  },
})
