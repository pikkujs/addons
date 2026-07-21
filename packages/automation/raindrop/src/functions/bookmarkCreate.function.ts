import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BookmarkCreateInput = z.object({
  link: z.string().optional(),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  important: z.boolean().optional(),
})

export const BookmarkCreateOutput = z.record(z.string(), z.unknown())

export const bookmarkCreate = pikkuSessionlessFunc({
  description: "Create a bookmark",
  input: BookmarkCreateInput,
  output: BookmarkCreateOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("POST", "/raindrop", data) as any
  },
})
