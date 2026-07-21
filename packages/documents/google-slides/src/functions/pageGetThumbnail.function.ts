import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PageGetThumbnailInput = z.object({
  presentationId: z.string(),
  pageObjectId: z.string(),
})

export const PageGetThumbnailOutput = z.object({
  contentUrl: z.string().optional(),
})

export const pageGetThumbnail = pikkuSessionlessFunc({
  description: "Get the thumbnail for a page",
  input: PageGetThumbnailInput,
  output: PageGetThumbnailOutput,
  func: async ({ googleSlides }, data) => {
    return googleSlides.call("GET", "/presentations/{presentationId}/pages/{pageObjectId}/thumbnail", data) as any
  },
})
