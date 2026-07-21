import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PresentationGetInput = z.object({
  presentationId: z.string(),
})

export const PresentationGetOutput = z.object({
  presentationId: z.string().optional(),
  title: z.string().optional(),
})

export const presentationGet = pikkuSessionlessFunc({
  description: "Get a presentation",
  input: PresentationGetInput,
  output: PresentationGetOutput,
  func: async ({ googleSlides }, data) => {
    return googleSlides.call("GET", "/presentations/{presentationId}", data) as any
  },
})
