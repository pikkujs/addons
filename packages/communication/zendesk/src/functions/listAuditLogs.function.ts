import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListAuditLogsInput = z.object({
  "filter[source_type]": z.string().optional().describe("Filter audit logs by the source type. For example, user or rule"),
  "filter[source_id]": z.number().int().optional().describe("Filter audit logs by the source id. Requires `filter[source_type]` to also be set"),
  "filter[actor_id]": z.number().int().optional().describe("Filter audit logs by the actor id"),
  "filter[ip_address]": z.string().optional().describe("Filter audit logs by the ip address"),
  "filter[created_at]": z.string().optional().describe("Filter audit logs by the time of creation. When used, you must specify `filter[created_at]` twice in your request, first with the start time and again with an end time"),
  "filter[action]": z.string().optional().describe("Filter audit logs by the action"),
  sort_by: z.string().optional().describe("Offset pagination only. Sort audit logs. Default is `sort_by=created_at`"),
  sort_order: z.string().optional().describe("Offset pagination only. Sort audit logs. Default is `sort_order=desc`"),
  sort: z.string().optional().describe("Cursor pagination only. Sort audit logs. Default is `sort=-created_at`"),
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
})

export const ListAuditLogsOutput = z.object({
  audit_logs: z.array(z.object({
    action: z.string().optional().describe("Type of change made. Possible values are \"create\", \"destroy\", \"exported\", \"login\", and \"update\"\n"),
    action_label: z.string().optional().describe("Localized string of action field"),
    actor_id: z.number().int().optional().describe("id of the user or system that initiated the change"),
    actor_name: z.string().optional().describe("Name of the user or system that initiated the change"),
    change_description: z.string().optional().describe("The description of the change that occurred"),
    created_at: z.string().datetime().optional().describe("The time the audit got created"),
    id: z.number().int().optional().describe("The id automatically assigned upon creation"),
    ip_address: z.string().optional().describe("The IP address of the user doing the audit"),
    source_id: z.number().int().optional().describe("The id of the item being audited"),
    source_label: z.string().optional().describe("The name of the item being audited"),
    source_type: z.string().optional().describe("Item type being audited. Typically describes the system where the change\nwas initiated. Possible values vary based on your account's Zendesk\nproducts and activity. Common values include \"apitoken\", \"rule\", \"ticket\",\n\"user\", and \"zendesk/app_market/app\". The \"rule\" value is used for\n[automations](https://support.zendesk.com/hc/en-us/articles/4408832701850),\n[macros](https://support.zendesk.com/hc/en-us/articles/4408844187034),\n[triggers](https://support.zendesk.com/hc/en-us/articles/4408822236058),\n[views](https://support.zendesk.com/hc/en-us/articles/4408888828570),\nand other automated business rules\n"),
    url: z.string().optional().describe("The URL to access the audit log"),
  })).optional(),
})

export const listAuditLogs = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins on accounts that have audit log access\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Filtering by multiple values\n\nTo filter by multiple values for the same field, repeat the filter parameter and append empty square brackets \"[]\" to the name of each repeated parameter. For example, to return audit logs where `action` is \"create\", \"update\", or \"destroy\":\n\n`/api/v2/audit_logs?filter[action][]=create&filter[action][]=update&filter[action][]=destroy`",
  input: ListAuditLogsInput,
  output: ListAuditLogsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/audit_logs", data) as any
  },
})
