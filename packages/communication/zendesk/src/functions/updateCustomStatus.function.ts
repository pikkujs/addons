import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateCustomStatusInput = z.object({
  custom_status_id: z.number().int().describe("The id of the custom status. Example: 1234567"),
  custom_status: z.object({
  active: z.boolean().optional().describe("True if the custom status is set as active; inactive if false"),
  agent_label: z.string().optional().describe("The dynamic content placeholder, if present, or the \"agent_label\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
  description: z.string().optional().describe("The dynamic content placeholder, if present, or the \"description\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
  end_user_description: z.string().optional().describe("The dynamic content placeholder, if present, or the \"end_user_description\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
  end_user_label: z.string().optional().describe("The dynamic content placeholder, if present, or the \"end_user_label\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
}).optional(),
})

export const UpdateCustomStatusOutput = z.object({
  custom_status: z.object({
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
  }).optional(),
})

export const updateCustomStatus = pikkuSessionlessFunc({
  description: "Takes a `custom_status` object that specifies the properties to update.\n\n#### Allowed For\n\n* Admins",
  input: UpdateCustomStatusInput,
  output: UpdateCustomStatusOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/custom_statuses/{custom_status_id}", data) as any
  },
})
