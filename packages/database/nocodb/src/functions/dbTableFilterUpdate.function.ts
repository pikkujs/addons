import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableFilterUpdateInput = z.object({
  filterId: z.string().min(0).max(20).regex(new RegExp("fi_pgfuo11uhn2xeo")).describe("Model for ID").describe("Unique Filter ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  comparison_op: z.union([z.enum(["allof", "anyof", "blank", "btw", "checked", "empty", "eq", "ge", "gt", "gte", "in", "is", "isWithin", "isnot", "le", "like", "lt", "lte", "nallof", "nanyof", "nbtw", "neq", "nlike", "not", "notblank", "notchecked", "notempty", "notnull", "null"]), z.unknown()]).optional().describe("Comparison Operator"),
  comparison_sub_op: z.union([z.enum(["daysAgo", "daysFromNow", "exactDate", "nextMonth", "nextNumberOfDays", "nextWeek", "nextYear", "oneMonthAgo", "oneMonthFromNow", "oneWeekAgo", "oneWeekFromNow", "pastMonth", "pastNumberOfDays", "pastWeek", "pastYear", "today", "tomorrow", "yesterday"]), z.unknown()]).optional().describe("Comparison Sub-Operator"),
  fk_column_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Column"),
  fk_widget_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Widget"),
  fk_parent_id: z.union([z.string(), z.unknown()]).optional().describe("Belong to which filter ID"),
  is_group: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this filter grouped?"),
  logical_op: z.enum(["and", "not", "or"]).optional().describe("Logical Operator"),
  value: z.unknown().optional().describe("The filter value. Can be NULL for some operators."),
  enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Whether this filter is enabled. Disabled filters are skipped during evaluation."),
  fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
})

export const DbTableFilterUpdateOutput = z.number()

export const dbTableFilterUpdate = pikkuSessionlessFunc({
  description: "Update the filter data with a given Filter ID",
  input: DbTableFilterUpdateInput,
  output: DbTableFilterUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/filters/{filterId}", data) as any
  },
})
