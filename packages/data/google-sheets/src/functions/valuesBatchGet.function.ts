import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ValuesBatchGetInput = z.object({
  spreadsheetId: z.string().describe("The ID of the spreadsheet to retrieve data from."),
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
  dateTimeRenderOption: z.enum(["SERIAL_NUMBER", "FORMATTED_STRING"]).optional().describe("How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER."),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `ranges=[\"A1:B2\"],majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `ranges=[\"A1:B2\"],majorDimension=COLUMNS` returns `[[1,3],[2,4]]`."),
  ranges: z.array(z.string()).optional().describe("The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from."),
  valueRenderOption: z.enum(["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"]).optional().describe("How values should be represented in the output. The default render option is ValueRenderOption.FORMATTED_VALUE."),
})

export const ValuesBatchGetOutput = z.object({
  spreadsheetId: z.string().optional().describe("The ID of the spreadsheet the data was retrieved from."),
  valueRanges: z.array(z.object({
    majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS."),
    range: z.string().optional().describe("The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended."),
    values: z.array(z.array(z.unknown())).optional().describe("The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),
  })).optional().describe("The requested values. The order of the ValueRanges is the same as the order of the requested ranges."),
}).describe("The response when retrieving more than one range of values in a spreadsheet.")

export const valuesBatchGet = pikkuSessionlessFunc({
  description: "Returns one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges.",
  input: ValuesBatchGetInput,
  output: ValuesBatchGetOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("GET", "/v4/spreadsheets/{spreadsheetId}/values:batchGet", data) as any
  },
})
