import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentUploadInput = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
})

export const DocumentUploadOutput = z.record(z.string(), z.unknown())

export const documentUpload = pikkuSessionlessFunc({
  description: "Upload document",
  input: DocumentUploadInput,
  output: DocumentUploadOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Document", data) as any
  },
})
