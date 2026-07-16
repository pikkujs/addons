import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ValuesAppendInput = z.object({
  spreadsheetId: z.string().describe("The ID of the spreadsheet to update."),
  range: z.string().describe("The [A1 notation](/sheets/api/guides/concepts#cell) of a range to search for a logical table of data. Values are appended after the last row of the table."),
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
  includeValuesInResponse: z.boolean().optional().describe("Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values."),
  insertDataOption: z.enum(["OVERWRITE", "INSERT_ROWS"]).optional().describe("How the input data should be inserted."),
  responseDateTimeRenderOption: z.enum(["SERIAL_NUMBER", "FORMATTED_STRING"]).optional().describe("Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER."),
  responseValueRenderOption: z.enum(["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"]).optional().describe("Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE."),
  valueInputOption: z.enum(["INPUT_VALUE_OPTION_UNSPECIFIED", "RAW", "USER_ENTERED"]).optional().describe("How the input data should be interpreted."),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS."),
  values: z.array(z.array(z.unknown())).optional().describe("The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),
})

export const ValuesAppendOutput = z.object({
  spreadsheetId: z.string().optional().describe("The spreadsheet the updates were applied to."),
  tableRange: z.string().optional().describe("The range (in A1 notation) of the table that values are being appended to (before the values were appended). Empty if no table was found."),
  updates: z.object({
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
  }).optional().describe("Information about the updates that were applied."),
}).describe("The response when updating a range of values in a spreadsheet.")

export const valuesAppend = pikkuSessionlessFunc({
  description: "Appends values to a spreadsheet. The input range is used to search for existing data and find a \"table\" within that range. Values will be appended to the next row of the table, starting with the first column of the table. See the [guide](/sheets/api/guides/values#appending_values) and [sample code](/sheets/api/samples/writing#append_values) for specific details of how tables are detected and data is appended. The caller must specify the spreadsheet ID, range, and a valueInputOption. The `valueInputOption` only controls how the input data will be added to the sheet (column-wise or row-wise), it does not influence what cell the data starts being written to.",
  input: ValuesAppendInput,
  output: ValuesAppendOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/values/{range}:append", data) as any
  },
})
