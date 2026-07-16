import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCommentsInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  after: z.unknown().optional().describe("Limit response to comments published after a given ISO8601 compliant date."),
  author: z.array(z.number().int()).optional().describe("Limit result set to comments assigned to specific user IDs. Requires authorization."),
  author_exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes comments assigned to specific user IDs. Requires authorization."),
  author_email: z.unknown().optional().describe("Limit result set to that from a specific author email. Requires authorization."),
  before: z.unknown().optional().describe("Limit response to comments published before a given ISO8601 compliant date."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("desc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["date", "date_gmt", "id", "include", "post", "parent", "type"]).optional().default("date_gmt").describe("Sort collection by comment attribute."),
  parent: z.array(z.number().int()).optional().describe("Limit result set to comments of specific parent IDs."),
  parent_exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific parent IDs."),
  post: z.array(z.number().int()).optional().describe("Limit result set to comments assigned to specific post IDs."),
  status: z.unknown().optional().default("approve").describe("Limit result set to comments assigned a specific status. Requires authorization."),
  type: z.unknown().optional().default("comment").describe("Limit result set to comments assigned a specific type. Requires authorization."),
  password: z.string().optional().describe("The password for the post if it is password protected."),
})

export const ListCommentsOutput = z.array(z.object({
  id: z.number().int().optional().describe("Unique identifier for the comment."),
  author: z.number().int().optional().describe("The ID of the user object, if author was a user."),
  author_email: z.string().email().optional().describe("Email address for the comment author."),
  author_ip: z.string().optional().describe("IP address for the comment author."),
  author_name: z.string().optional().describe("Display name for the comment author."),
  author_url: z.string().url().optional().describe("URL for the comment author."),
  author_user_agent: z.string().optional().describe("User agent for the comment author."),
  content: z.object({
    raw: z.string().optional().describe("Content for the comment, as it exists in the database."),
    rendered: z.string().optional().describe("HTML content for the comment, transformed for display."),
  }).optional().describe("The content for the comment."),
  date: z.string().datetime().optional().describe("The date the comment was published, in the site's timezone."),
  date_gmt: z.string().datetime().optional().describe("The date the comment was published, as GMT."),
  link: z.string().url().optional().describe("URL to the comment."),
  parent: z.number().int().optional().default(0).describe("The ID for the parent of the comment."),
  post: z.number().int().optional().default(0).describe("The ID of the associated post object."),
  status: z.string().optional().describe("State of the comment."),
  type: z.string().optional().default("comment").describe("Type of the comment."),
  author_avatar_urls: z.object({
    "24": z.string().url().optional().describe("Avatar URL with image size of 24 pixels."),
    "48": z.string().url().optional().describe("Avatar URL with image size of 48 pixels."),
    "96": z.string().url().optional().describe("Avatar URL with image size of 96 pixels."),
  }).optional().describe("Avatar URLs for the comment author."),
  meta: z.object({
    _wp_note_status: z.enum(["resolved", "reopen"]).optional().describe("Note resolution status"),
  }).optional().describe("Meta fields."),
}))

export const listComments = pikkuSessionlessFunc({
  input: ListCommentsInput,
  output: ListCommentsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/comments", data) as any
  },
})
