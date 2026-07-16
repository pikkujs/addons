import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ValuesBatchClearByDataFilterInput = z.object({
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
  dataFilters: z.array(z.object({
  a1Range: z.string().optional().describe("Selects data that matches the specified A1 range."),
  developerMetadataLookup: z.object({
    locationMatchingStrategy: z.enum(["DEVELOPER_METADATA_LOCATION_MATCHING_STRATEGY_UNSPECIFIED", "EXACT_LOCATION", "INTERSECTING_LOCATION"]).optional().describe("Determines how this lookup matches the location. If this field is specified as EXACT, only developer metadata associated on the exact location specified is matched. If this field is specified to INTERSECTING, developer metadata associated on intersecting locations is also matched. If left unspecified, this field assumes a default value of INTERSECTING. If this field is specified, a metadataLocation must also be specified."),
    locationType: z.enum(["DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED", "ROW", "COLUMN", "SHEET", "SPREADSHEET"]).optional().describe("Limits the selected developer metadata to those entries which are associated with locations of the specified type. For example, when this field is specified as ROW this lookup only considers developer metadata associated on rows. If the field is left unspecified, all location types are considered. This field cannot be specified as SPREADSHEET when the locationMatchingStrategy is specified as INTERSECTING or when the metadataLocation is specified as a non-spreadsheet location: spreadsheet metadata cannot intersect any other developer metadata location. This field also must be left unspecified when the locationMatchingStrategy is specified as EXACT."),
    metadataId: z.number().int().optional().describe("Limits the selected developer metadata to that which has a matching DeveloperMetadata.metadata_id."),
    metadataKey: z.string().optional().describe("Limits the selected developer metadata to that which has a matching DeveloperMetadata.metadata_key."),
    metadataLocation: z.object({
      dimensionRange: z.object({
        dimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The dimension of the span."),
        endIndex: z.number().int().optional().describe("The end (exclusive) of the span, or not set if unbounded."),
        sheetId: z.number().int().optional().describe("The sheet this span is on."),
        startIndex: z.number().int().optional().describe("The start (inclusive) of the span, or not set if unbounded."),
      }).optional().describe("Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column; it cannot be unbounded or span multiple rows or columns."),
      locationType: z.enum(["DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED", "ROW", "COLUMN", "SHEET", "SPREADSHEET"]).optional().describe("The type of location this object represents. This field is read-only."),
      sheetId: z.number().int().optional().describe("The ID of the sheet when metadata is associated with an entire sheet."),
      spreadsheet: z.boolean().optional().describe("True when metadata is associated with an entire spreadsheet."),
    }).optional().describe("Limits the selected developer metadata to those entries associated with the specified location. This field either matches exact locations or all intersecting locations according the specified locationMatchingStrategy."),
    metadataValue: z.string().optional().describe("Limits the selected developer metadata to that which has a matching DeveloperMetadata.metadata_value."),
    visibility: z.enum(["DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED", "DOCUMENT", "PROJECT"]).optional().describe("Limits the selected developer metadata to that which has a matching DeveloperMetadata.visibility. If left unspecified, all developer metadata visibile to the requesting project is considered."),
  }).optional().describe("Selects data associated with the developer metadata matching the criteria described by this DeveloperMetadataLookup."),
  gridRange: z.object({
    endColumnIndex: z.number().int().optional().describe("The end column (exclusive) of the range, or not set if unbounded."),
    endRowIndex: z.number().int().optional().describe("The end row (exclusive) of the range, or not set if unbounded."),
    sheetId: z.number().int().optional().describe("The sheet this range is on."),
    startColumnIndex: z.number().int().optional().describe("The start column (inclusive) of the range, or not set if unbounded."),
    startRowIndex: z.number().int().optional().describe("The start row (inclusive) of the range, or not set if unbounded."),
  }).optional().describe("Selects data that matches the range described by the GridRange."),
})).optional().describe("The DataFilters used to determine which ranges to clear."),
})

export const ValuesBatchClearByDataFilterOutput = z.object({
  clearedRanges: z.array(z.string()).optional().describe("The ranges that were cleared, in [A1 notation](/sheets/api/guides/concepts#cell). If the requests are for an unbounded range or a ranger larger than the bounds of the sheet, this is the actual ranges that were cleared, bounded to the sheet's limits."),
  spreadsheetId: z.string().optional().describe("The spreadsheet the updates were applied to."),
}).describe("The response when clearing a range of values selected with DataFilters in a spreadsheet.")

export const valuesBatchClearByDataFilter = pikkuSessionlessFunc({
  description: "Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges matching any of the specified data filters will be cleared. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.",
  input: ValuesBatchClearByDataFilterInput,
  output: ValuesBatchClearByDataFilterOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter", data) as any
  },
})
