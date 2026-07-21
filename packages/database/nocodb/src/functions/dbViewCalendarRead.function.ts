import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewCalendarReadInput = z.object({
  calendarViewId: z.string().describe("Unique Calendar View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewCalendarReadOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  fk_view_id: z.string().min(0).max(20).optional().describe("View ID"),
  fk_cover_image_col_id: z.union([z.string(), z.unknown()]).optional().describe("Cover Image Column ID"),
  columns: z.array(z.object({
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
    fk_view_id: z.string().min(0).max(20).optional().describe("Foreign Key to View"),
    source_id: z.string().min(0).max(20).optional().describe("Baes ID\n"),
    base_id: z.string().min(0).max(20).optional().describe("Base ID"),
    title: z.string().optional().describe("Base ID"),
    show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown?"),
    bold: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown as bold?"),
    italic: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown as italic?"),
    underline: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown underlines?"),
    order: z.number().optional().describe("Column Order"),
  })).optional().describe("Calendar Columns"),
  calendar_range: z.array(z.object({
    fk_from_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
    fk_view_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to View"),
    label: z.string().optional().describe("Base ID"),
  })).optional().describe("Calendar Date Range"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info for Kanban"),
  title: z.string().optional().describe("Kanban Title"),
}).describe("Model for Calendar")

export const dbViewCalendarRead = pikkuSessionlessFunc({
  description: "Get the Calendar View data by Calendar ID",
  input: DbViewCalendarReadInput,
  output: DbViewCalendarReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/calendars/{calendarViewId}", data) as any
  },
})
