import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MediaUploadInput = z.object({
  filename: z.string().optional(),
  roomId: z.string().optional(),
  mediaType: z.string().optional(),
})

export const MediaUploadOutput = z.object({
  content_uri: z.string().optional(),
})

export const mediaUpload = pikkuSessionlessFunc({
  description: "Upload media",
  input: MediaUploadInput,
  output: MediaUploadOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("POST", "/upload", data) as any
  },
})
