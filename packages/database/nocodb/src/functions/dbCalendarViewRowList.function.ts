import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DbCalendarViewRowListInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  from_date: z.string(),
  prev_date: z.string(),
  next_date: z.string(),
  to_date: z.string(),
  fields: z.array(z.unknown()).optional(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  offset: z.number().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const dbCalendarViewRowList = pikkuSessionlessFunc({
  description: "List all rows in Calendar View of a Table",
  input: DbCalendarViewRowListInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/calendar-data/{orgs}/{baseName}/{tableName}/views/{viewName}", data)
  },
})
