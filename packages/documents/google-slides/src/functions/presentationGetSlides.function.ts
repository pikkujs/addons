import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PresentationGetSlidesInput = z.object({
  presentationId: z.string(),
  fields: z.string().optional(),
})

export const PresentationGetSlidesOutput = z.object({
  slides: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const presentationGetSlides = pikkuSessionlessFunc({
  description: "Get presentation slides",
  input: PresentationGetSlidesInput,
  output: PresentationGetSlidesOutput,
  func: async ({ googleSlides }, data) => {
    return googleSlides.call("GET", "/presentations/{presentationId}/slides", data) as any
  },
})
