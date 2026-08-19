import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTaskListTemplateInput = z.object({
  task_list_template_id: z.string().describe("The id of the task list template. Example: \"01K205PG0J2ET0B8AFHA106C1E\""),
})

export const deleteTaskListTemplate = pikkuSessionlessFunc({
  description: "Deletes a task list template with the specified id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteTaskListTemplateInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/task_list_templates/{task_list_template_id}", data)
  },
})
