import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PageGetInput = z.object({
  presentationId: z.string(),
  pageObjectId: z.string(),
})

export const PageGetOutput = z.object({
  objectId: z.string().optional(),
})

export const pageGet = pikkuSessionlessFunc({
  description: "Get a page",
  input: PageGetInput,
  output: PageGetOutput,
  func: async ({ googleSlides }, data) => {
    return googleSlides.call("GET", "/presentations/{presentationId}/pages/{pageObjectId}", data) as any
  },
})
