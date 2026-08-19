import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataCalendarRowCountInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  from_date: z.string(),
  prev_date: z.string(),
  next_date: z.string(),
  to_date: z.string(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  limit: z.number().int().min(1).optional(),
  offset: z.number().int().min(0).optional(),
  "xc-password": z.string().optional().describe("Shared view password"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const PublicDataCalendarRowCountOutput = z.unknown()

export const publicDataCalendarRowCount = pikkuSessionlessFunc({
  input: PublicDataCalendarRowCountInput,
  output: PublicDataCalendarRowCountOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/calendar-view/{sharedViewUuid}/countByDate", data) as any
  },
})
