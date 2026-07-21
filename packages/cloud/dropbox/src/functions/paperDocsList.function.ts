import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsListInput = z.object({
  sort_by: z.object({
  ".tag": z.enum(["accessed", "modified", "created", "other"]).optional(),
}).optional().describe("accessed: Sorts the Paper docs by the time they were last accessed.\nmodified: Sorts the Paper docs by the time they were last modified.\ncreated: Sorts the Paper docs by the creation time.\nother: None\n"),
  sort_order: z.object({
  ".tag": z.enum(["ascending", "descending", "other"]).optional(),
}).optional().describe("ascending: Sorts the search result in ascending order.\ndescending: Sorts the search result in descending order.\nother: None\n"),
  limit: z.number().optional().describe("Size limit per batch. The maximum number of docs that can be retrieved per batch is 1000. Higher value results in invalid arguments error."),
  filter_by: z.object({
  ".tag": z.enum(["docs_accessed", "docs_created", "other"]).optional(),
}).optional().describe("docs_accessed: Fetches all Paper doc IDs that the user has ever accessed.\ndocs_created: Fetches only the Paper doc IDs that the user has created.\nother: None\n"),
})

export const PaperDocsListOutput = z.object({
  cursor: z.object({
    expiration: z.string().optional().describe("Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results."),
    value: z.string().optional().describe("The actual cursor value."),
  }).optional().describe("value: The actual cursor value.\nexpiration: Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results.\n"),
  has_more: z.boolean().optional().describe("Will be set to True if a subsequent call with the provided cursor to :route:`docs/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/list/continue`."),
  doc_ids: z.array(z.string()).optional().describe("The list of Paper doc IDs that can be used to access the given Paper docs or supplied to other API methods. The list is sorted in the order specified by the initial call to :route:`docs/list`."),
}).describe("doc_ids: The list of Paper doc IDs that can be used to access the given Paper docs or supplied to other API methods. The list is sorted in the order specified by the initial call to :route:`docs/list`.\ncursor: Pass the cursor into :route:`docs/list/continue` to paginate through all files. The cursor preserves all properties as specified in the original call to :route:`docs/list`.\nhas_more: Will be set to True if a subsequent call with the provided cursor to :route:`docs/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/list/continue`.\n")

export const paperDocsList = pikkuSessionlessFunc({
  description: "Return the list of all Paper docs according to the argument specifications. To iterate over through the full pagination, pass the cursor to :route:`docs/list/continue`.",
  input: PaperDocsListInput,
  output: PaperDocsListOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/list", data) as any
  },
})
