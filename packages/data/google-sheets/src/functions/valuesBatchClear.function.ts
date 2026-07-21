import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ValuesBatchClearInput = z.object({
  spreadsheetId: z.string().describe("The ID of the spreadsheet to update."),
  "$.xgafv": z.enum(["1", "2"]).optional().describe("V1 error format."),
  access_token: z.string().optional().describe("OAuth access token."),
  alt: z.enum(["json", "media", "proto"]).optional().describe("Data format for response."),
  callback: z.string().optional().describe("JSONP"),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters."),
  upload_protocol: z.string().optional().describe("Upload protocol for media (e.g. \"raw\", \"multipart\")."),
  uploadType: z.string().optional().describe("Legacy upload protocol for media (e.g. \"media\", \"multipart\")."),
  ranges: z.array(z.string()).optional().describe("The ranges to clear, in [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell)."),
})

export const ValuesBatchClearOutput = z.object({
  clearedRanges: z.array(z.string()).optional().describe("The ranges that were cleared, in A1 notation. If the requests are for an unbounded range or a ranger larger than the bounds of the sheet, this is the actual ranges that were cleared, bounded to the sheet's limits."),
  spreadsheetId: z.string().optional().describe("The spreadsheet the updates were applied to."),
}).describe("The response when clearing a range of values in a spreadsheet.")

export const valuesBatchClear = pikkuSessionlessFunc({
  description: "Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges. Only values are cleared -- all other properties of the cell (such as formatting and data validation) are kept.",
  input: ValuesBatchClearInput,
  output: ValuesBatchClearOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/values:batchClear", data) as any
  },
})
