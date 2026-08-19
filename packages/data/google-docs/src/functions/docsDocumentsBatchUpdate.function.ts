import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocsDocumentsBatchUpdateInput = z.any()

export const DocsDocumentsBatchUpdateOutput = z.object({
  documentId: z.string().optional().describe("The ID of the document to which the updates were applied to."),
  replies: z.array(z.object({
    createFooter: z.object({
      footerId: z.string().optional().describe("The ID of the created footer."),
    }).optional().describe("The result of creating a footer."),
    createFootnote: z.object({
      footnoteId: z.string().optional().describe("The ID of the created footnote."),
    }).optional().describe("The result of creating a footnote."),
    createHeader: z.object({
      headerId: z.string().optional().describe("The ID of the created header."),
    }).optional().describe("The result of creating a header."),
    createNamedRange: z.object({
      namedRangeId: z.string().optional().describe("The ID of the created named range."),
    }).optional().describe("The result of creating a named range."),
    insertInlineImage: z.object({
      objectId: z.string().optional().describe("The ID of the created InlineObject."),
    }).optional().describe("The result of inserting an inline image."),
    insertInlineSheetsChart: z.object({
      objectId: z.string().optional().describe("The object ID of the inserted chart."),
    }).optional().describe("The result of inserting an inline Google Sheets chart."),
    replaceAllText: z.object({
      occurrencesChanged: z.number().int().optional().describe("The number of occurrences changed by replacing all text."),
    }).optional().describe("The result of replacing text."),
  })).optional().describe("The reply of the updates. This maps 1:1 with the updates, although replies to some requests may be empty."),
  writeControl: z.object({
    requiredRevisionId: z.string().optional().describe("The optional revision ID of the document the write request is applied to. If this is not the latest revision of the document, the request is not processed and returns a 400 bad request error. When a required revision ID is returned in a response, it indicates the revision ID of the document after the request was applied."),
    targetRevisionId: z.string().optional().describe("The optional target revision ID of the document the write request is applied to. If collaborator changes have occurred after the document was read using the API, the changes produced by this write request are applied against the collaborator changes. This results in a new revision of the document that incorporates both the collaborator changes and the changes in the request, with the Docs server resolving conflicting changes. When using target revision ID, the API client can be thought of as another collaborator of the document. The target revision ID can only be used to write to recent versions of a document. If the target revision is too far behind the latest revision, the request is not processed and returns a 400 bad request error. The request should be tried again after retrieving the latest version of the document. Usually a revision ID remains valid for use as a target revision for several minutes after it's read, but for frequently edited documents this window might be shorter."),
  }).optional().describe("The updated write control after applying the request."),
}).describe("Response message from a BatchUpdateDocument request.")

export const docsDocumentsBatchUpdate = pikkuSessionlessFunc({
  description: "Applies one or more updates to the document. Each request is validated before being applied. If any request is not valid, then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. Other requests do not need to return information; these each return an empty reply. The order of replies matches that of the requests. For example, suppose you call batchUpdate with four updates, and only the third one returns information. The response would have two empty replies, the reply to the third request, and another empty reply, in that order. Because other users may be editing the document, the document might not exactly reflect your changes: your changes may be altered with respect to collaborator changes. If there are no collaborators, the document should reflect your changes. In any case, the updates in your request are guaranteed to be applied together atomically.",
  input: DocsDocumentsBatchUpdateInput,
  output: DocsDocumentsBatchUpdateOutput,
  func: async ({ googleDocs }, data) => {
    return googleDocs.call("POST", "/v1/documents/{documentId}:batchUpdate", data) as any
  },
})
