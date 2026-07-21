import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostCreateInput = z.object({
  author: z.string().optional().describe("URN of the author (person or organization)"),
  commentary: z.string().optional().describe("The primary text content of the post"),
  visibility: z.string().optional().describe("Post visibility (PUBLIC or CONNECTIONS)"),
  lifecycleState: z.string().optional().describe("Lifecycle state of the post"),
})

export const PostCreateOutput = z.object({
  urn: z.string().optional(),
})

export const postCreate = pikkuSessionlessFunc({
  description: "Create a new post",
  input: PostCreateInput,
  output: PostCreateOutput,
  func: async ({ linkedin }, data) => {
    return linkedin.call("POST", "/posts", data) as any
  },
})
