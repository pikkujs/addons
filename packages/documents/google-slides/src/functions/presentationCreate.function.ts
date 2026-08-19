import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PresentationCreateInput = z.object({
  title: z.string().optional(),
})

export const PresentationCreateOutput = z.object({
  presentationId: z.string().optional(),
  title: z.string().optional(),
})

export const presentationCreate = pikkuSessionlessFunc({
  description: "Create a presentation",
  input: PresentationCreateInput,
  output: PresentationCreateOutput,
  func: async ({ googleSlides }, data) => {
    return googleSlides.call("POST", "/presentations", data) as any
  },
})
