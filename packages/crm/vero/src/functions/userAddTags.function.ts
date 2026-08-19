import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserAddTagsInput = z.object({
  body: z.string().optional(),
})

export const UserAddTagsOutput = z.record(z.string(), z.unknown())

export const userAddTags = pikkuSessionlessFunc({
  description: "User add tags",
  input: UserAddTagsInput,
  output: UserAddTagsOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/users/tags/edit", data) as any
  },
})
