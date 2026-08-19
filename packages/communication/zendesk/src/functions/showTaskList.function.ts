import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowTaskListInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ShowTaskListOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  task_lists: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the task list was created"),
    description: z.string().optional().describe("The description of the task list"),
    id: z.string().optional().describe("Automatically assigned when a task list template is added to a ticket, creating the task list"),
    is_required: z.boolean().optional().describe("Whether the task list is required. Inherited from the task list template when created. If true, the associated ticket cannot be solved until all tasks are completed."),
    name: z.string().describe("The name of the task list"),
    task_count: z.number().int().optional().describe("The number of tasks in the task list"),
    task_list_template_id: z.string().describe("The ID of the task list template that the task list was created from"),
    ticket_id: z.string().describe("The ID of the ticket that the task list is attached to"),
    updated_at: z.string().datetime().optional().describe("The time the task list was last updated"),
  })).optional(),
})

export const showTaskList = pikkuSessionlessFunc({
  description: "Returns the task list attached to the specified ticket. If the ticket doesn't have a task list, an empty array is returned.\n\n#### Allowed For\n\n* Agents",
  input: ShowTaskListInput,
  output: ShowTaskListOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/task_lists", data) as any
  },
})
