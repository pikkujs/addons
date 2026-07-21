import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowTaskListTemplateInput = z.object({
  task_list_template_id: z.string().describe("The id of the task list template. Example: \"01K205PG0J2ET0B8AFHA106C1E\""),
})

export const ShowTaskListTemplateOutput = z.object({
  task_list_template: z.object({
    created_at: z.string().datetime().optional().describe("The time the task list template was created"),
    description: z.string().optional().describe("The description of the task list template"),
    id: z.string().optional().describe("Automatically assigned when the task list template is created"),
    is_active: z.boolean().optional().describe("Whether the task list template is active and available for use by agents, or inactive and unavailable for use"),
    is_required: z.boolean().optional().describe("Whether the task list template is required. When a task list is created from a required template, tickets cannot be solved until all tasks in the task list are completed."),
    name: z.string().describe("The name of the task list template"),
    task_count: z.number().int().optional().describe("The number of tasks in the task list template"),
    tasks: z.array(z.object({
      created_at: z.string().datetime().optional().describe("The time the task was created"),
      description: z.string().optional().describe("The description of the task"),
      id: z.string().optional().describe("Automatically assigned when the task is created"),
      name: z.string().describe("The name of the task"),
      position: z.number().int().optional().describe("The position of the task in the task list template"),
      required: z.boolean().optional().describe("Whether the task is required to complete the task list"),
      updated_at: z.string().datetime().optional().describe("The time the task was last updated"),
    })).optional().describe("The tasks for the task list template. Only present for some endpoints."),
    updated_at: z.string().datetime().optional().describe("The time the task list template was last updated"),
    url: z.string().optional().describe("URL of the task list template"),
  }).optional(),
})

export const showTaskListTemplate = pikkuSessionlessFunc({
  description: "Returns the task list template with the specified id. The template's tasks aren't included in the response.\n\n#### Allowed For\n\n* Agents",
  input: ShowTaskListTemplateInput,
  output: ShowTaskListTemplateOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/task_list_templates/{task_list_template_id}", data) as any
  },
})
