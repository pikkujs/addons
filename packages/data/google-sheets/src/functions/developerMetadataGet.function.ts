import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeveloperMetadataGetInput = z.object({
  spreadsheetId: z.string().describe("The ID of the spreadsheet to retrieve metadata from."),
  metadataId: z.number().int().describe("The ID of the developer metadata to retrieve."),
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
})

export const DeveloperMetadataGetOutput = z.object({
  location: z.object({
    dimensionRange: z.object({
      dimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).optional().describe("The dimension of the span."),
      endIndex: z.number().int().optional().describe("The end (exclusive) of the span, or not set if unbounded."),
      sheetId: z.number().int().optional().describe("The sheet this span is on."),
      startIndex: z.number().int().optional().describe("The start (inclusive) of the span, or not set if unbounded."),
    }).optional().describe("Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column; it cannot be unbounded or span multiple rows or columns."),
    locationType: z.enum(["DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED", "ROW", "COLUMN", "SHEET", "SPREADSHEET"]).optional().describe("The type of location this object represents. This field is read-only."),
    sheetId: z.number().int().optional().describe("The ID of the sheet when metadata is associated with an entire sheet."),
    spreadsheet: z.boolean().optional().describe("True when metadata is associated with an entire spreadsheet."),
  }).optional().describe("The location where the metadata is associated."),
  metadataId: z.number().int().optional().describe("The spreadsheet-scoped unique ID that identifies the metadata. IDs may be specified when metadata is created, otherwise one will be randomly generated and assigned. Must be positive."),
  metadataKey: z.string().optional().describe("The metadata key. There may be multiple metadata in a spreadsheet with the same key. Developer metadata must always have a key specified."),
  metadataValue: z.string().optional().describe("Data associated with the metadata's key."),
  visibility: z.enum(["DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED", "DOCUMENT", "PROJECT"]).optional().describe("The metadata visibility. Developer metadata must always have a visibility specified."),
}).describe("Developer metadata associated with a location or object in a spreadsheet. Developer metadata may be used to associate arbitrary data with various parts of a spreadsheet and will remain associated at those locations as they move around and the spreadsheet is edited. For example, if developer metadata is associated with row 5 and another row is then subsequently inserted above row 5, that original metadata will still be associated with the row it was first associated with (what is now row 6). If the associated object is deleted its metadata is deleted too.")

export const developerMetadataGet = pikkuSessionlessFunc({
  description: "Returns the developer metadata with the specified ID. The caller must specify the spreadsheet ID and the developer metadata's unique metadataId.",
  input: DeveloperMetadataGetInput,
  output: DeveloperMetadataGetOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("GET", "/v4/spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}", data) as any
  },
})
