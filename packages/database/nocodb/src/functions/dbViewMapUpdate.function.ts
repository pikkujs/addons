import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewMapUpdateInput = z.object({
  mapViewId: z.string().describe("Unique Map View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  fk_geo_data_col_id: z.string().optional().describe("Foreign Key to GeoData Column"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta data for this view"),
})

export const DbViewMapUpdateOutput = z.number()

export const dbViewMapUpdate = pikkuSessionlessFunc({
  description: "Update the Map View data by Map ID",
  input: DbViewMapUpdateInput,
  output: DbViewMapUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/maps/{mapViewId}", data) as any
  },
})
