import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateCommentsInput = z.object({
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
  parent: z.number().int().optional().default(0).describe("The ID for the parent of the comment."),
  post: z.number().int().optional().default(0).describe("The ID of the associated post object."),
  status: z.string().optional().describe("State of the comment."),
  meta: z.object({
  _wp_note_status: z.enum(["resolved", "reopen"]).optional().describe("Note resolution status"),
}).optional().describe("Meta fields."),
})

export const CreateCommentsOutput = z.object({
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
})

export const createComments = pikkuSessionlessFunc({
  input: CreateCommentsInput,
  output: CreateCommentsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/comments", data) as any
  },
})
