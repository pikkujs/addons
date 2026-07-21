import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExportAuditLogsInput = z.object({
  "filter[source_type]": z.string().optional().describe("Filter audit logs by the source type. For example, user or rule"),
  "filter[source_id]": z.number().int().optional().describe("Filter audit logs by the source id. Requires `filter[source_type]` to also be set."),
  "filter[actor_id]": z.number().int().optional().describe("Filter audit logs by the actor id"),
  "filter[ip_address]": z.string().optional().describe("Filter audit logs by the ip address"),
  "filter[created_at]": z.string().optional().describe("Filter audit logs by the time of creation. When used, you must specify `filter[created_at]` twice in your request, first with the start time and again with an end time"),
  "filter[action]": z.string().optional().describe("Filter audit logs by the action"),
})

export const ExportAuditLogsOutput = z.string().describe("Empty response")

export const exportAuditLogs = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins on accounts that have audit log access\n\n#### Limits\nThis endpoint's rate limit is different from the account-wide rate limit. The rate limit is one request per minute per account.  When this limit is reached, you'll get a `429 Too Many Requests` response code.\n\n##### Headers\nAPI responses include usage limit information in the headers for this endpoint.\n\n```\nZendesk-RateLimit-audit-logs-export: total={number}; remaining={number}; resets={number}\n```\n\nWithin this header, “Total” signifies the initial allocation, “Remaining” indicates the remaining allowance for the current interval, and “Resets” denotes the wait time in seconds before the limit refreshes. You can see the Total, and Interval values in the below table.\n\n##### Details\n\nThe rate limit is one request per minute per account. If you exceed this, you'll receive the following error: \"Rate limit for Audit log CSV Export exceeded. Please wait 1 minute and try again.\"",
  input: ExportAuditLogsInput,
  output: ExportAuditLogsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/audit_logs/export", data) as any
  },
})
