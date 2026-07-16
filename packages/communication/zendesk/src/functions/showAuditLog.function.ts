import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowAuditLogInput = z.object({
  audit_log_id: z.number().int().describe("The ID of the audit log. Example: 498483"),
})

export const ShowAuditLogOutput = z.object({
  audit_log: z.object({
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
  }).optional(),
})

export const showAuditLog = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins on accounts that have audit-log access",
  input: ShowAuditLogInput,
  output: ShowAuditLogOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/audit_logs/{audit_log_id}", data) as any
  },
})
