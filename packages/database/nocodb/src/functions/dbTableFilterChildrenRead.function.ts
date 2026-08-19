import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableFilterChildrenReadInput = z.object({
  filterGroupId: z.string().min(0).max(20).describe("Filter Group ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableFilterChildrenReadOutput = z.object({
  list: z.array(z.object({
    source_id: z.string().optional().describe("Unqiue Source ID"),
    children: z.array(z.object({
      source_id: z.string().optional().describe("Unqiue Source ID"),
      children: z.any().optional().describe("Children filters. Available when the filter is grouped."),
      comparison_op: z.union([z.enum(["allof", "anyof", "blank", "btw", "checked", "empty", "eq", "ge", "gt", "gte", "in", "is", "isWithin", "isnot", "le", "like", "lt", "lte", "nallof", "nanyof", "nbtw", "neq", "nlike", "not", "notblank", "notchecked", "notempty", "notnull", "null"]), z.unknown()]).optional().describe("Comparison Operator"),
      comparison_sub_op: z.union([z.enum(["daysAgo", "daysFromNow", "exactDate", "nextMonth", "nextNumberOfDays", "nextWeek", "nextYear", "oneMonthAgo", "oneMonthFromNow", "oneWeekAgo", "oneWeekFromNow", "pastMonth", "pastNumberOfDays", "pastWeek", "pastYear", "today", "tomorrow", "yesterday"]), z.unknown()]).optional().describe("Comparison Sub-Operator"),
      fk_parent_column_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to parent column"),
      fk_column_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Column"),
      fk_hook_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Hook"),
      fk_model_id: z.string().min(0).max(20).optional().describe("Foreign Key to Model"),
      fk_parent_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to parent group."),
      fk_view_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to View"),
      fk_value_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to dynamic value Column"),
      fk_link_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Link Column"),
      fk_rls_policy_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to RLS Policy"),
      fk_button_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Button Column"),
      id: z.string().min(0).max(20).optional().describe("Unique ID"),
      is_group: z.union([z.boolean(), z.number().int(), z.unknown()]).optional().describe("Is this filter grouped?"),
      logical_op: z.enum(["and", "not", "or"]).optional().describe("Logical Operator"),
      base_id: z.string().optional().describe("Unique Base ID"),
      value: z.unknown().optional().describe("The filter value. Can be NULL for some operators."),
      order: z.number().optional().describe("The order of the filter"),
      enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Whether this filter is enabled. Disabled filters are skipped during evaluation."),
      fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
    })).optional().describe("Children filters. Available when the filter is grouped."),
    comparison_op: z.union([z.enum(["allof", "anyof", "blank", "btw", "checked", "empty", "eq", "ge", "gt", "gte", "in", "is", "isWithin", "isnot", "le", "like", "lt", "lte", "nallof", "nanyof", "nbtw", "neq", "nlike", "not", "notblank", "notchecked", "notempty", "notnull", "null"]), z.unknown()]).optional().describe("Comparison Operator"),
    comparison_sub_op: z.union([z.enum(["daysAgo", "daysFromNow", "exactDate", "nextMonth", "nextNumberOfDays", "nextWeek", "nextYear", "oneMonthAgo", "oneMonthFromNow", "oneWeekAgo", "oneWeekFromNow", "pastMonth", "pastNumberOfDays", "pastWeek", "pastYear", "today", "tomorrow", "yesterday"]), z.unknown()]).optional().describe("Comparison Sub-Operator"),
    fk_parent_column_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to parent column"),
    fk_column_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Column"),
    fk_hook_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Hook"),
    fk_model_id: z.string().min(0).max(20).optional().describe("Foreign Key to Model"),
    fk_parent_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to parent group."),
    fk_view_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to View"),
    fk_value_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to dynamic value Column"),
    fk_link_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Link Column"),
    fk_rls_policy_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to RLS Policy"),
    fk_button_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Button Column"),
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    is_group: z.union([z.boolean(), z.number().int(), z.unknown()]).optional().describe("Is this filter grouped?"),
    logical_op: z.enum(["and", "not", "or"]).optional().describe("Logical Operator"),
    base_id: z.string().optional().describe("Unique Base ID"),
    value: z.unknown().optional().describe("The filter value. Can be NULL for some operators."),
    order: z.number().optional().describe("The order of the filter"),
    enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Whether this filter is enabled. Disabled filters are skipped during evaluation."),
    fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
  })).describe("List of filter objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Model for Paginated"),
}).describe("Model for Filter List")

export const dbTableFilterChildrenRead = pikkuSessionlessFunc({
  description: "Get Filter Group Children of a given group ID",
  input: DbTableFilterChildrenReadInput,
  output: DbTableFilterChildrenReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/filters/{filterGroupId}/children", data) as any
  },
})
