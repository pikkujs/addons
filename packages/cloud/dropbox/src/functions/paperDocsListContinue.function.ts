import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsListContinueInput = z.object({
  cursor: z.string().optional().describe("The cursor obtained from :route:`docs/list` or :route:`docs/list/continue`. Allows for pagination."),
})

export const PaperDocsListContinueOutput = z.object({
  cursor: z.object({
    expiration: z.string().optional().describe("Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results."),
    value: z.string().optional().describe("The actual cursor value."),
  }).optional().describe("value: The actual cursor value.\nexpiration: Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results.\n"),
  has_more: z.boolean().optional().describe("Will be set to True if a subsequent call with the provided cursor to :route:`docs/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/list/continue`."),
  doc_ids: z.array(z.string()).optional().describe("The list of Paper doc IDs that can be used to access the given Paper docs or supplied to other API methods. The list is sorted in the order specified by the initial call to :route:`docs/list`."),
}).describe("doc_ids: The list of Paper doc IDs that can be used to access the given Paper docs or supplied to other API methods. The list is sorted in the order specified by the initial call to :route:`docs/list`.\ncursor: Pass the cursor into :route:`docs/list/continue` to paginate through all files. The cursor preserves all properties as specified in the original call to :route:`docs/list`.\nhas_more: Will be set to True if a subsequent call with the provided cursor to :route:`docs/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/list/continue`.\n")

export const paperDocsListContinue = pikkuSessionlessFunc({
  description: "Once a cursor has been retrieved from :route:`docs/list`, use this to paginate through all Paper doc.",
  input: PaperDocsListContinueInput,
  output: PaperDocsListContinueOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/list/continue", data) as any
  },
})
