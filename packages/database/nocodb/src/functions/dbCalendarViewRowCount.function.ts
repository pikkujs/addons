import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbCalendarViewRowCountInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  from_date: z.string(),
  to_date: z.string(),
  prev_date: z.string(),
  next_date: z.string(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  limit: z.number().int().min(1).optional(),
  offset: z.number().int().min(0).optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbCalendarViewRowCountOutput = z.unknown()

export const dbCalendarViewRowCount = pikkuSessionlessFunc({
  description: "Get the count of table view rows grouped by the dates",
  input: DbCalendarViewRowCountInput,
  output: DbCalendarViewRowCountOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/calendar-data/{orgs}/{baseName}/{tableName}/views/{viewName}/countByDate/", data) as any
  },
})
