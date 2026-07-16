import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewMapReadInput = z.object({
  mapViewId: z.string().describe("Unique Map View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewMapReadOutput = z.object({
  source_id: z.string().optional().describe("The ID of the source that this view belongs to"),
  columns: z.array(z.object({
    source_id: z.string().optional().describe("The ID of the source that this map column belongs to"),
    fk_column_id: z.string().optional().describe("Foreign Key to Column"),
    fk_view_id: z.string().optional().describe("Foreign Key to View"),
    id: z.string().optional().describe("Unique ID of Map Column"),
    order: z.number().optional().describe("the order in the list of map columns"),
    base_id: z.string().optional().describe("The ID of the base that this map column belongs to"),
    show: z.number().optional().describe("Whether to show this column or not"),
  })).optional().describe("Columns in this view"),
  fk_geo_data_col_id: z.string().optional().describe("Foreign Key to GeoData Column"),
  fk_view_id: z.string().optional().describe("Unique ID for Map"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta data for this view"),
  order: z.number().optional().describe("The order of the map list"),
  base_id: z.string().optional().describe("The ID of the base that this view belongs to"),
  show: z.boolean().optional().describe("To show this Map or not"),
  title: z.string().optional().describe("Title of Map View"),
}).describe("Model for Map")

export const dbViewMapRead = pikkuSessionlessFunc({
  description: "Get the Map View data by Map ID",
  input: DbViewMapReadInput,
  output: DbViewMapReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/maps/{mapViewId}", data) as any
  },
})
