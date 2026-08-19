import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListCustomStatusesInput = z.object({
  status_categories: z.string().optional().describe("Filter the list of custom ticket statuses by a comma-separated list of status categories"),
  active: z.boolean().optional().describe("If true, show only active custom ticket statuses. If false, show only inactive custom ticket statuses. If the filter is not used, show all custom ticket statuses"),
  default: z.boolean().optional().describe("If true, show only default custom ticket statuses. If false, show only non-default custom ticket statuses. If the filter is not used, show all custom ticket statuses"),
})

export const ListCustomStatusesOutput = z.object({
  custom_statuses: z.array(z.object({
    active: z.boolean().optional().describe("If true, the custom status is set to active, If false, the custom status is set to inactive"),
    agent_label: z.string().describe("The label displayed to agents. Maximum length is 48 characters"),
    created_at: z.string().datetime().optional().describe("The date and time the custom ticket status was created"),
    default: z.boolean().optional().describe("If true, the custom status is set to default. If false, the custom status is set to non-default"),
    description: z.string().optional().describe("The description of when the user should select this custom ticket status"),
    end_user_description: z.string().optional().describe("The description displayed to end users"),
    end_user_label: z.string().optional().describe("The label displayed to end users. Maximum length is 48 characters"),
    id: z.number().int().optional().describe("Automatically assigned when the custom ticket status is created"),
    raw_agent_label: z.string().optional().describe("The dynamic content placeholder. If the dynamic content placeholder is not available, this is the \"agent_label\" value. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_description: z.string().optional().describe("The dynamic content placeholder. If the dynamic content placeholder is not available, this is the \"description\" value. [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_end_user_description: z.string().optional().describe("The dynamic content placeholder. If the dynamic content placeholder is not available, this is the \"end_user_description\" value. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_end_user_label: z.string().optional().describe("The dynamic content placeholder. If the dynamic content placeholder is not available, this is the \"end_user_label\" value. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    status_category: z.enum(["new", "open", "pending", "hold", "solved"]).describe("The status category the custom ticket status belongs to"),
    updated_at: z.string().datetime().optional().describe("The date and time the custom ticket status was last updated"),
  })).optional(),
})

export const listCustomStatuses = pikkuSessionlessFunc({
  description: "Lists all undeleted custom ticket statuses for the account. No pagination is provided.\n\n#### Allowed For\n\n* End Users",
  input: ListCustomStatusesInput,
  output: ListCustomStatusesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_statuses", data) as any
  },
})
