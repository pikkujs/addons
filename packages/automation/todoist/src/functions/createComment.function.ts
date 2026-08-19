import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateCommentInput = z.object({
  task_id: z.string().optional().describe("Comment's task ID (for task comments). task_id or project_id required"),
  project_id: z.string().optional().describe("Comment's project ID (for project comments). task_id or project_id required"),
  content: z.string().describe("Comment content. This value may contain markdown-formatted text and hyperlinks."),
  attachment: z.object({
  resource_type: z.string().optional(),
  file_url: z.string().optional(),
  file_type: z.string().optional(),
  file_name: z.string().optional(),
}).optional().describe("Object for attachment object."),
})

export const CreateCommentOutput = z.object({
  id: z.string().optional().describe("Comment ID."),
  task_id: z.unknown().optional().describe("Comment's task ID (will be null if the comment belongs to a project)."),
  project_id: z.unknown().optional().describe("Comment's project ID (will be null if the comment belongs to a task)."),
  posted_at: z.string().datetime().optional().describe("Date and time when comment was added, in RFC3339 format in UTC."),
  content: z.string().optional().describe("Comment content. This value may contain markdown-formatted text and hyperlinks. Details on markdown support can be found in the Text Formatting article in the Help Center."),
  attachment: z.unknown().optional().describe("Attachment file metadata (will be null if there is no attachment). Format varies depending on the type of attachment, as detailed in the Sync API documentation."),
})

export const createComment = pikkuSessionlessFunc({
  description: "Creates a new comment on a project or task and returns it as a JSON object. Note that one of task_id or project_id arguments is required.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: CreateCommentInput,
  output: CreateCommentOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/comments", data) as any
  },
})
