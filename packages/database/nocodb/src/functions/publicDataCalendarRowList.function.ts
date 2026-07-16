import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PublicDataCalendarRowListInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  from_date: z.string(),
  to_date: z.string(),
  prev_date: z.string(),
  next_date: z.string(),
  fields: z.array(z.unknown()).optional(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  offset: z.number().optional(),
  "xc-password": z.string().optional().describe("Shared view password"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const publicDataCalendarRowList = pikkuSessionlessFunc({
  description: "List all rows in Calendar View of a Table",
  input: PublicDataCalendarRowListInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/calendar-view/{sharedViewUuid}", data)
  },
})
