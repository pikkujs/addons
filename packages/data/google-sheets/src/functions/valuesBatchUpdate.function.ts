import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ValuesBatchUpdateInput = z.object({
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
  data: z.array(z.object({
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS."),
  range: z.string().optional().describe("The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended."),
  values: z.array(z.array(z.unknown())).optional().describe("The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),
})).optional().describe("The new values to apply to the spreadsheet."),
  includeValuesInResponse: z.boolean().optional().describe("Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. The `updatedData` field within each of the BatchUpdateValuesResponse.responses contains the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns)."),
  responseDateTimeRenderOption: z.enum(["SERIAL_NUMBER", "FORMATTED_STRING"]).optional().describe("Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER."),
  responseValueRenderOption: z.enum(["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"]).optional().describe("Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE."),
  valueInputOption: z.enum(["INPUT_VALUE_OPTION_UNSPECIFIED", "RAW", "USER_ENTERED"]).optional().describe("How the input data should be interpreted."),
})

export const ValuesBatchUpdateOutput = z.object({
  responses: z.array(z.object({
    spreadsheetId: z.string().optional().describe("The spreadsheet the updates were applied to."),
    updatedCells: z.number().int().optional().describe("The number of cells updated."),
    updatedColumns: z.number().int().optional().describe("The number of columns where at least one cell in the column was updated."),
    updatedData: z.object({
      majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS."),
      range: z.string().optional().describe("The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended."),
      values: z.array(z.array(z.unknown())).optional().describe("The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),
    }).optional().describe("The values of the cells after updates were applied. This is only included if the request's `includeValuesInResponse` field was `true`."),
    updatedRange: z.string().optional().describe("The range (in A1 notation) that updates were applied to."),
    updatedRows: z.number().int().optional().describe("The number of rows where at least one cell in the row was updated."),
  })).optional().describe("One UpdateValuesResponse per requested range, in the same order as the requests appeared."),
  spreadsheetId: z.string().optional().describe("The spreadsheet the updates were applied to."),
  totalUpdatedCells: z.number().int().optional().describe("The total number of cells updated."),
  totalUpdatedColumns: z.number().int().optional().describe("The total number of columns where at least one cell in the column was updated."),
  totalUpdatedRows: z.number().int().optional().describe("The total number of rows where at least one cell in the row was updated."),
  totalUpdatedSheets: z.number().int().optional().describe("The total number of sheets where at least one cell in the sheet was updated."),
}).describe("The response when updating a range of values in a spreadsheet.")

export const valuesBatchUpdate = pikkuSessionlessFunc({
  description: "Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more ValueRanges.",
  input: ValuesBatchUpdateInput,
  output: ValuesBatchUpdateOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/values:batchUpdate", data) as any
  },
})
