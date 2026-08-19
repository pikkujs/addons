import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateProjectInput = z.object({
  projectId: z.string().describe("Project ID."),
  name: z.string().optional().describe("Name of the project"),
  color: z.string().optional().describe("The color of the project icon. Refer to the name column in the Colors guide for more info. https://developer.todoist.com/guides/#colors"),
  is_favorite: z.boolean().optional().describe("Whether the project is a favorite (a true or false value)."),
  view_style: z.string().optional().describe("A string value (either list or board, default is list). This determines the way the project is displayed within the Todoist clients."),
})

export const UpdateProjectOutput = z.object({
  id: z.string().optional().describe("Project ID."),
  name: z.string().optional().describe("Project name."),
  color: z.string().optional().describe("The color of the project icon. Refer to the name column in the Colors guide for more info."),
  parent_id: z.unknown().optional().describe("ID of parent project (will be null for top-level projects)."),
  order: z.number().int().optional().describe("Project position under the same parent (read-only, will be 0 for inbox and team inbox projects)."),
  comment_count: z.number().int().optional().describe("Number of project comments."),
  is_shared: z.boolean().optional().describe("Whether the project is shared (read-only, a true or false value)."),
  is_favorite: z.boolean().optional().describe("Whether the project is a favorite (a true or false value)."),
  is_inbox_project: z.boolean().optional().describe("Whether the project is the user's Inbox (read-only)."),
  is_team_inbox: z.boolean().optional().describe("Whether the project is the Team Inbox (read-only)."),
  view_style: z.string().optional().describe("A string value (either list or board). This determines the way the project is displayed within the Todoist clients."),
  url: z.string().optional().describe("URL to access this project in the Todoist web or mobile applications."),
})

export const updateProject = pikkuSessionlessFunc({
  description: "Returns a JSON object containing the updated project object.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: UpdateProjectInput,
  output: UpdateProjectOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/projects/{projectId}", data) as any
  },
})
