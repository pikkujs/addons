import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateTaskListTemplateInput = z.object({
  task_list_template_id: z.string().describe("The id of the task list template. Example: \"01K205PG0J2ET0B8AFHA106C1E\""),
  task_list_template: z.object({
  description: z.string().optional().describe("The new description of the task list template"),
  is_active: z.boolean().optional().describe("The new active status of the task list template"),
  is_required: z.boolean().optional().describe("Whether the task list template is required"),
  name: z.string().optional().describe("The new name of the task list template"),
  tasks: z.array(z.union([z.object({
    _destroy: z.literal(true).describe("If true, deletes the task"),
    id: z.string().describe("The id of the task to delete from a task list template"),
  }), z.object({
    description: z.string().optional().describe("The new description of the task"),
    id: z.string().describe("The id of the task to update"),
    name: z.string().optional().describe("The new name of the task"),
    position: z.number().int().optional().describe("The new position of the task within the task list template"),
    required: z.boolean().optional().describe("Whether the task is required when an agent adds the task list to a ticket"),
  }), z.object({
    description: z.string().optional().describe("The description of the task"),
    name: z.string().describe("The name of the task"),
    position: z.number().int().optional().describe("The position of the task within the task list template"),
    required: z.boolean().optional().describe("Whether the task is required when an agent adds the task list to a ticket"),
  })])).optional().describe("Tasks to create, update, or delete for the template"),
}),
})

export const UpdateTaskListTemplateOutput = z.object({
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

export const updateTaskListTemplate = pikkuSessionlessFunc({
  description: "Creates, modifies, or deletes tasks in a task list template. Only the tasks included in the `task_list_template` object in the request are updated. Tasks that aren't specified in the request are unchanged.\n\n#### Allowed For\n\n* Admins",
  input: UpdateTaskListTemplateInput,
  output: UpdateTaskListTemplateOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/task_list_templates/{task_list_template_id}", data) as any
  },
})
