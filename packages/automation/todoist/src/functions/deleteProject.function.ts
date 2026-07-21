import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteProjectInput = z.object({
  projectId: z.string().describe("Project ID."),
})

export const deleteProject = pikkuSessionlessFunc({
  description: "Deletes a project.\n\nA successful response has 204 No Content status and an empty body.",
  input: DeleteProjectInput,
  func: async ({ todoist }, data) => {
    return todoist.call("DELETE", "/projects/{projectId}", data)
  },
})
