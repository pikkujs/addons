import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateTaskInput = z.object({
  taskId: z.string().describe("The ID of the task to update."),
  content: z.string().optional().describe("Task content. This value may contain markdown-formatted text and hyperlinks."),
  description: z.string().optional().describe("A description for the task. This value may contain markdown-formatted text and hyperlinks."),
  labels: z.array(z.string()).optional().describe("The task's labels (a list of names that may represent either personal or shared labels)."),
  priority: z.number().int().optional().describe("Task priority from 1 (normal) to 4 (urgent)."),
  due_string: z.string().optional().describe("Human-defined task due date (ex. \"next Monday,\" \"Tomorrow\"). Value is set using local (not UTC) time."),
  due_date: z.string().optional().describe("Specific date in YYYY-MM-DD format relative to the user's timezone."),
  due_datetime: z.string().optional().describe("Specific date and time in RFC3339 format in UTC."),
  due_lang: z.string().optional().describe("2-letter code specifying the language in case due_string is not written in English."),
  assignee_id: z.string().optional().describe("The responsible user ID or null to unset (for shared tasks)."),
  duration: z.number().int().optional().describe("A positive integer for the task duration, or null to unset. If specified, you must define a duration_unit."),
  duration_unit: z.string().optional().describe("The unit of time for the duration. Must be either 'minute' or 'day'."),
})

export const UpdateTaskOutput = z.object({
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
})

export const updateTask = pikkuSessionlessFunc({
  description: "Updates a specified task and returns it as a JSON object.",
  input: UpdateTaskInput,
  output: UpdateTaskOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/tasks/{taskId}", data) as any
  },
})
