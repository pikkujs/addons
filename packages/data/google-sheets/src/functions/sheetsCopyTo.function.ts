import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SheetsCopyToInput = z.object({
  spreadsheetId: z.string().describe("The ID of the spreadsheet containing the sheet to copy."),
  sheetId: z.number().int().describe("The ID of the sheet to copy."),
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
  destinationSpreadsheetId: z.string().optional().describe("The ID of the spreadsheet to copy the sheet to."),
})

export const SheetsCopyToOutput = z.object({
  dataSourceSheetProperties: z.object({
    columns: z.array(z.object({
      formula: z.string().optional().describe("The formula of the calculated column."),
      reference: z.object({
        name: z.string().optional().describe("The display name of the column. It should be unique within a data source."),
      }).optional().describe("The column reference."),
    })).optional().describe("The columns displayed on the sheet, corresponding to the values in RowData."),
    dataExecutionStatus: z.object({
      errorCode: z.enum(["DATA_EXECUTION_ERROR_CODE_UNSPECIFIED", "TIMED_OUT", "TOO_MANY_ROWS", "TOO_MANY_COLUMNS", "TOO_MANY_CELLS", "ENGINE", "PARAMETER_INVALID", "UNSUPPORTED_DATA_TYPE", "DUPLICATE_COLUMN_NAMES", "INTERRUPTED", "CONCURRENT_QUERY", "OTHER", "TOO_MANY_CHARS_PER_CELL", "DATA_NOT_FOUND", "PERMISSION_DENIED", "MISSING_COLUMN_ALIAS", "OBJECT_NOT_FOUND", "OBJECT_IN_ERROR_STATE", "OBJECT_SPEC_INVALID"]).optional().describe("The error code."),
      errorMessage: z.string().optional().describe("The error message, which may be empty."),
      lastRefreshTime: z.string().optional().describe("Gets the time the data last successfully refreshed."),
      state: z.enum(["DATA_EXECUTION_STATE_UNSPECIFIED", "NOT_STARTED", "RUNNING", "SUCCEEDED", "FAILED"]).optional().describe("The state of the data execution."),
    }).optional().describe("The data execution status."),
    dataSourceId: z.string().optional().describe("ID of the DataSource the sheet is connected to."),
  }).optional().describe("Output only. If present, the field contains DATA_SOURCE sheet specific properties."),
  gridProperties: z.object({
    columnCount: z.number().int().optional().describe("The number of columns in the grid."),
    columnGroupControlAfter: z.boolean().optional().describe("True if the column grouping control toggle is shown after the group."),
    frozenColumnCount: z.number().int().optional().describe("The number of columns that are frozen in the grid."),
    frozenRowCount: z.number().int().optional().describe("The number of rows that are frozen in the grid."),
    hideGridlines: z.boolean().optional().describe("True if the grid isn't showing gridlines in the UI."),
    rowCount: z.number().int().optional().describe("The number of rows in the grid."),
    rowGroupControlAfter: z.boolean().optional().describe("True if the row grouping control toggle is shown after the group."),
  }).optional().describe("Additional properties of the sheet if this sheet is a grid. (If the sheet is an object sheet, containing a chart or image, then this field will be absent.) When writing it is an error to set any grid properties on non-grid sheets. If this sheet is a DATA_SOURCE sheet, this field is output only but contains the properties that reflect how a data source sheet is rendered in the UI, e.g. row_count."),
  hidden: z.boolean().optional().describe("True if the sheet is hidden in the UI, false if it's visible."),
  index: z.number().int().optional().describe("The index of the sheet within the spreadsheet. When adding or updating sheet properties, if this field is excluded then the sheet is added or moved to the end of the sheet list. When updating sheet indices or inserting sheets, movement is considered in \"before the move\" indexes. For example, if there were 3 sheets (S1, S2, S3) in order to move S1 ahead of S2 the index would have to be set to 2. A sheet index update request is ignored if the requested index is identical to the sheets current index or if the requested new index is equal to the current sheet index + 1."),
  rightToLeft: z.boolean().optional().describe("True if the sheet is an RTL sheet instead of an LTR sheet."),
  sheetId: z.number().int().optional().describe("The ID of the sheet. Must be non-negative. This field cannot be changed once set."),
  sheetType: z.enum(["SHEET_TYPE_UNSPECIFIED", "GRID", "OBJECT", "DATA_SOURCE"]).optional().describe("The type of sheet. Defaults to GRID. This field cannot be changed once set."),
  tabColor: z.object({
    alpha: z.number().optional().describe("The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0)."),
    blue: z.number().optional().describe("The amount of blue in the color as a value in the interval [0, 1]."),
    green: z.number().optional().describe("The amount of green in the color as a value in the interval [0, 1]."),
    red: z.number().optional().describe("The amount of red in the color as a value in the interval [0, 1]."),
  }).optional().describe("The color of the tab in the UI. Deprecated: Use tab_color_style."),
  tabColorStyle: z.object({
    rgbColor: z.object({
      alpha: z.number().optional().describe("The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0)."),
      blue: z.number().optional().describe("The amount of blue in the color as a value in the interval [0, 1]."),
      green: z.number().optional().describe("The amount of green in the color as a value in the interval [0, 1]."),
      red: z.number().optional().describe("The amount of red in the color as a value in the interval [0, 1]."),
    }).optional().describe("RGB color. The [`alpha`](/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported."),
    themeColor: z.enum(["THEME_COLOR_TYPE_UNSPECIFIED", "TEXT", "BACKGROUND", "ACCENT1", "ACCENT2", "ACCENT3", "ACCENT4", "ACCENT5", "ACCENT6", "LINK"]).optional().describe("Theme color."),
  }).optional().describe("The color of the tab in the UI. If tab_color is also set, this field takes precedence."),
  title: z.string().optional().describe("The name of the sheet."),
}).describe("Properties of a sheet.")

export const sheetsCopyTo = pikkuSessionlessFunc({
  description: "Copies a single sheet from a spreadsheet to another spreadsheet. Returns the properties of the newly created sheet.",
  input: SheetsCopyToInput,
  output: SheetsCopyToOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo", data) as any
  },
})
