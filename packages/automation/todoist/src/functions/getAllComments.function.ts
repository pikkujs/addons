import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetAllCommentsInput = z.object({
  project_id: z.string().optional().describe("ID of the project used to filter comments. task_id or project_id required"),
  task_id: z.string().optional().describe("ID of the task used to filter comments. task_id or project_id required"),
})

export const GetAllCommentsOutput = z.array(z.object({
  id: z.string().optional().describe("Comment ID."),
  task_id: z.unknown().optional().describe("Comment's task ID (will be null if the comment belongs to a project)."),
  project_id: z.unknown().optional().describe("Comment's project ID (will be null if the comment belongs to a task)."),
  posted_at: z.string().datetime().optional().describe("Date and time when comment was added, in RFC3339 format in UTC."),
  content: z.string().optional().describe("Comment content. This value may contain markdown-formatted text and hyperlinks. Details on markdown support can be found in the Text Formatting article in the Help Center."),
  attachment: z.unknown().optional().describe("Attachment file metadata (will be null if there is no attachment). Format varies depending on the type of attachment, as detailed in the Sync API documentation."),
}))

export const getAllComments = pikkuSessionlessFunc({
  description: "Returns a JSON-encoded array of all comments for a given task_id or project_id. Note that one of task_id or project_id arguments is required.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: GetAllCommentsInput,
  output: GetAllCommentsOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("GET", "/comments", data) as any
  },
})
