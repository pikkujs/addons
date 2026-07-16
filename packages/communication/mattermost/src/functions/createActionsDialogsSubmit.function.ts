// integration_actions — Endpoints for interactive actions for use by integrations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateActionsDialogsSubmitInput = z.object({
  url: z.string().describe("The URL to send the submitted dialog payload to"),
  channel_id: z.string().describe("Channel ID the user submitted the dialog from"),
  team_id: z.string().describe("Team ID the user submitted the dialog from"),
  submission: z.record(z.string(), z.unknown()).describe("String map where keys are element names and values are the element input values"),
  callback_id: z.string().optional().describe("Callback ID sent when the dialog was opened"),
  state: z.string().optional().describe("State sent when the dialog was opened"),
  cancelled: z.boolean().optional().describe("Set to true if the dialog was cancelled"),
})

export const CreateActionsDialogsSubmitOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createActionsDialogsSubmit = pikkuSessionlessFunc({
  description: "Endpoint used by the Mattermost clients to submit a dialog. See https://docs.mattermost.com/developer/interactive-dialogs.html for more information on interactive dialogs.\n__Minimum server version: 5.6__",
  input: CreateActionsDialogsSubmitInput,
  output: CreateActionsDialogsSubmitOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/actions/dialogs/submit", data) as any
  },
})
