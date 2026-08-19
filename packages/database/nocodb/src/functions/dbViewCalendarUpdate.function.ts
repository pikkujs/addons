import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewCalendarUpdateInput = z.object({
  calendarViewId: z.string().describe("Unique Calendar View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  fk_cover_image_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Cover Image Column"),
  title: z.string().optional().describe("Calendar Title"),
  calendar_range: z.array(z.object({
  fk_from_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
  fk_view_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to View"),
  label: z.string().optional().describe("Base ID"),
})).optional().describe("Calendar Columns"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info"),
})

export const DbViewCalendarUpdateOutput = z.number()

export const dbViewCalendarUpdate = pikkuSessionlessFunc({
  description: "Update the Calendar View data with Calendar ID",
  input: DbViewCalendarUpdateInput,
  output: DbViewCalendarUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/calendars/{calendarViewId}", data) as any
  },
})
