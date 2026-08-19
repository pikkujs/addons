import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ValuesBatchGetByDataFilterInput = z.object({
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
})).optional().describe("The data filters used to match the ranges of values to retrieve. Ranges that match any of the specified data filters are included in the response."),
  dateTimeRenderOption: z.enum(["SERIAL_NUMBER", "FORMATTED_STRING"]).optional().describe("How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER."),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then a request that selects that range and sets `majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas a request that sets `majorDimension=COLUMNS` returns `[[1,3],[2,4]]`."),
  valueRenderOption: z.enum(["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"]).optional().describe("How values should be represented in the output. The default render option is FORMATTED_VALUE."),
})

export const ValuesBatchGetByDataFilterOutput = z.object({
  spreadsheetId: z.string().optional().describe("The ID of the spreadsheet the data was retrieved from."),
  valueRanges: z.array(z.object({
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
    })).optional().describe("The DataFilters from the request that matched the range of values."),
    valueRange: z.object({
      majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS."),
      range: z.string().optional().describe("The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended."),
      values: z.array(z.array(z.unknown())).optional().describe("The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),
    }).optional().describe("The values matched by the DataFilter."),
  })).optional().describe("The requested values with the list of data filters that matched them."),
}).describe("The response when retrieving more than one range of values in a spreadsheet selected by DataFilters.")

export const valuesBatchGetByDataFilter = pikkuSessionlessFunc({
  description: "Returns one or more ranges of values that match the specified data filters. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges that match any of the data filters in the request will be returned.",
  input: ValuesBatchGetByDataFilterInput,
  output: ValuesBatchGetByDataFilterOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter", data) as any
  },
})
