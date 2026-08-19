import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ValuesBatchUpdateByDataFilterInput = z.object({
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
  dataFilter: z.object({
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
  }).optional().describe("The data filter describing the location of the values in the spreadsheet."),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values."),
  values: z.array(z.array(z.unknown())).optional().describe("The data to be written. If the provided values exceed any of the ranges matched by the data filter then the request fails. If the provided values are less than the matched ranges only the specified values are written, existing values in the matched ranges remain unaffected."),
})).optional().describe("The new values to apply to the spreadsheet. If more than one range is matched by the specified DataFilter the specified values are applied to all of those ranges."),
  includeValuesInResponse: z.boolean().optional().describe("Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. The `updatedData` field within each of the BatchUpdateValuesResponse.responses contains the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns)."),
  responseDateTimeRenderOption: z.enum(["SERIAL_NUMBER", "FORMATTED_STRING"]).optional().describe("Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER."),
  responseValueRenderOption: z.enum(["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"]).optional().describe("Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE."),
  valueInputOption: z.enum(["INPUT_VALUE_OPTION_UNSPECIFIED", "RAW", "USER_ENTERED"]).optional().describe("How the input data should be interpreted."),
})

export const ValuesBatchUpdateByDataFilterOutput = z.object({
  responses: z.array(z.object({
    dataFilter: z.object({
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
    }).optional().describe("The data filter that selected the range that was updated."),
    updatedCells: z.number().int().optional().describe("The number of cells updated."),
    updatedColumns: z.number().int().optional().describe("The number of columns where at least one cell in the column was updated."),
    updatedData: z.object({
      majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS."),
      range: z.string().optional().describe("The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended."),
      values: z.array(z.array(z.unknown())).optional().describe("The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),
    }).optional().describe("The values of the cells in the range matched by the dataFilter after all updates were applied. This is only included if the request's `includeValuesInResponse` field was `true`."),
    updatedRange: z.string().optional().describe("The range (in [A1 notation](/sheets/api/guides/concepts#cell)) that updates were applied to."),
    updatedRows: z.number().int().optional().describe("The number of rows where at least one cell in the row was updated."),
  })).optional().describe("The response for each range updated."),
  spreadsheetId: z.string().optional().describe("The spreadsheet the updates were applied to."),
  totalUpdatedCells: z.number().int().optional().describe("The total number of cells updated."),
  totalUpdatedColumns: z.number().int().optional().describe("The total number of columns where at least one cell in the column was updated."),
  totalUpdatedRows: z.number().int().optional().describe("The total number of rows where at least one cell in the row was updated."),
  totalUpdatedSheets: z.number().int().optional().describe("The total number of sheets where at least one cell in the sheet was updated."),
}).describe("The response when updating a range of values in a spreadsheet.")

export const valuesBatchUpdateByDataFilter = pikkuSessionlessFunc({
  description: "Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more DataFilterValueRanges.",
  input: ValuesBatchUpdateByDataFilterInput,
  output: ValuesBatchUpdateByDataFilterOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter", data) as any
  },
})
