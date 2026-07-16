import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetActiveTasksInput = z.object({
  project_id: z.string().optional().describe("Filter tasks by project ID."),
  section_id: z.string().optional().describe("Filter tasks by section ID."),
  label: z.string().optional().describe("Filter tasks by label name."),
  filter: z.string().optional().describe("Filter by any supported filter."),
  lang: z.string().optional().describe("IETF language tag defining what language the filter is written in, if it differs from the default English."),
  ids: z.array(z.number().int()).optional().describe("A list of the task IDs to retrieve, this should be a comma-separated list."),
})

export const GetActiveTasksOutput = z.array(z.object({
  id: z.string().optional().describe("Task ID."),
  project_id: z.string().optional().describe("Task's project ID (read-only)."),
  section_id: z.unknown().optional().describe("ID of section task belongs to (read-only, will be null when the task has no parent section)."),
  content: z.string().optional().describe("Task content. This value may contain markdown-formatted text and hyperlinks. Details on markdown support can be found in the Text Formatting article in the Help Center."),
  description: z.string().optional().describe("A description for the task. This value may contain markdown-formatted text and hyperlinks. Details on markdown support can be found in the Text Formatting article in the Help Center."),
  is_completed: z.boolean().optional().describe("Flag to mark completed tasks."),
  labels: z.array(z.string()).optional(),
  parent_id: z.unknown().optional().describe("ID of parent task (read-only, will be null for top-level tasks)."),
  order: z.number().int().optional().describe("Position under the same parent or project for top-level tasks (read-only)."),
  priority: z.number().int().optional().describe("Task priority from 1 (normal, default value) to 4 (urgent)."),
  due: z.object({
    dueObject: z.object({
      string: z.string().describe("Human defined date in arbitrary format."),
      date: z.string().date().describe("Date in format YYYY-MM-DD corrected to user's timezone."),
      is_recurring: z.boolean().describe("Whether the task has a recurring due date."),
      datetime: z.string().datetime().optional().describe("Only returned if exact due time set (i.e. it's not a whole-day task), date and time in RFC3339 format in UTC."),
      timezone: z.string().optional().describe("Only returned if exact due time set, user's timezone definition either in tzdata-compatible format (\"Europe/Berlin\") or as a string specifying east of UTC offset as \"UTC±HH:MM\" (i.e. \"UTC-01:00\")."),
    }).optional(),
  }).optional().describe("Object representing task due date/time, or null if no date is set."),
  url: z.string().optional().describe("URL to access this task in the Todoist web or mobile applications (read-only)."),
  comment_count: z.number().int().optional().describe("Number of task comments (read-only)."),
  created_at: z.string().optional().describe("The date when the task was created (read-only)."),
  creator_id: z.string().optional().describe("The ID of the user who created the task (read-only)."),
  assignee_id: z.unknown().optional().describe("The responsible user ID (will be null if the task is unassigned)."),
  assigner_id: z.unknown().optional().describe("The ID of the user who assigned the task (read-only, will be null if the task is unassigned)."),
  duration: z.object({
    durationObject: z.object({
      amount: z.unknown().optional().describe("A positive (greater than zero) integer for the amount of duration_unit the task will take, or null to unset. If specified, you must define a duration_unit."),
      unit: z.unknown().optional().describe("The unit of time that the duration field above represents, or null to unset. Must be either minute or day. If specified, duration must be defined as well."),
    }).optional(),
  }).optional().describe("Object representing a task's duration, including a positive integer for the amount of time and the unit of time (minute or day). The object will be null if the task has no duration."),
}))

export const getActiveTasks = pikkuSessionlessFunc({
  description: "Returns a JSON-encoded array containing all active tasks.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: GetActiveTasksInput,
  output: GetActiveTasksOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("GET", "/tasks", data) as any
  },
})
