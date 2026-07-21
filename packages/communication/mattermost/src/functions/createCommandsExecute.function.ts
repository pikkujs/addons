// commands — Endpoints for creating, getting and updating slash commands.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateCommandsExecuteInput = z.object({
  channel_id: z.string().describe("Channel Id where the command will execute"),
  command: z.string().describe("The slash command to execute"),
})

export const CreateCommandsExecuteOutput = z.object({
  ResponseType: z.string().optional().describe("The response type either in_channel or ephemeral"),
  Text: z.string().optional(),
  Username: z.string().optional(),
  IconURL: z.string().optional(),
  GotoLocation: z.string().optional(),
  Attachments: z.array(z.object({
    Id: z.string().optional(),
    Fallback: z.string().optional(),
    Color: z.string().optional(),
    Pretext: z.string().optional(),
    AuthorName: z.string().optional(),
    AuthorLink: z.string().optional(),
    AuthorIcon: z.string().optional(),
    Title: z.string().optional(),
    TitleLink: z.string().optional(),
    Text: z.string().optional(),
    Fields: z.array(z.object({
      Title: z.string().optional(),
      Value: z.string().optional().describe("The value of the attachment, set as string but capable with golang interface"),
      Short: z.boolean().optional(),
    })).optional(),
    ImageURL: z.string().optional(),
    ThumbURL: z.string().optional(),
    Footer: z.string().optional(),
    FooterIcon: z.string().optional(),
    Timestamp: z.string().optional().describe("The timestamp of the slack attachment, either type of string or integer"),
  })).optional(),
})

export const createCommandsExecute = pikkuSessionlessFunc({
  description: "Execute a command on a team.\n##### Permissions\nMust have `use_slash_commands` permission for the team the command is in.",
  input: CreateCommandsExecuteInput,
  output: CreateCommandsExecuteOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/commands/execute", data) as any
  },
})
