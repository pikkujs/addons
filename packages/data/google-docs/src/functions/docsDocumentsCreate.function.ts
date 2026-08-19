import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocsDocumentsCreateInput = z.any()

export const DocsDocumentsCreateOutput = z.any()

export const docsDocumentsCreate = pikkuSessionlessFunc({
  description: "Creates a blank document using the title given in the request. Other fields in the request, including any provided content, are ignored. Returns the created document.",
  input: DocsDocumentsCreateInput,
  output: DocsDocumentsCreateOutput,
  func: async ({ googleDocs }, data) => {
    return googleDocs.call("POST", "/v1/documents", data) as any
  },
})
