import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetTasksByTaskListTemplateIdInput = z.object({
  task_list_template_id: z.string().describe("The id of the task list template. Example: \"01K205PG0J2ET0B8AFHA106C1E\""),
})

export const GetTasksByTaskListTemplateIdOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  tasks: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the task was created"),
    description: z.string().optional().describe("The description of the task"),
    id: z.string().optional().describe("Automatically assigned when the task is created"),
    name: z.string().describe("The name of the task"),
    position: z.number().int().optional().describe("The position of the task in the task list template"),
    required: z.boolean().optional().describe("Whether the task is required to complete the task list"),
    updated_at: z.string().datetime().optional().describe("The time the task was last updated"),
  })).optional(),
})

export const getTasksByTaskListTemplateId = pikkuSessionlessFunc({
  description: "Returns the tasks for the specified task list template.\n\n#### Allowed For\n\n* Agents",
  input: GetTasksByTaskListTemplateIdInput,
  output: GetTasksByTaskListTemplateIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/task_list_templates/{task_list_template_id}/tasks", data) as any
  },
})
