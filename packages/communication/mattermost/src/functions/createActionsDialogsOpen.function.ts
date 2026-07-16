// integration_actions — Endpoints for interactive actions for use by integrations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const CreateActionsDialogsOpenInput = z.object({
  trigger_id: z.string().describe("Trigger ID provided by other action"),
  url: z.string().describe("The URL to send the submitted dialog payload to"),
  dialog: z.object({
  callback_id: z.string().optional().describe("Set an ID that will be included when the dialog is submitted"),
  title: z.string().describe("Title of the dialog"),
  elements: z.array(z.record(z.string(), z.unknown())).describe("Input elements, see https://docs.mattermost.com/developer/interactive-dialogs.html#elements"),
  submit_label: z.string().optional().describe("Label on the submit button"),
  notify_on_cancel: z.boolean().optional().describe("Set true to receive payloads when user cancels a dialog"),
  state: z.string().optional().describe("Set some state to be echoed back with the dialog submission"),
}).describe("Post object to create"),
})

export const CreateActionsDialogsOpenOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createActionsDialogsOpen = pikkuSessionlessFunc({
  description: "Open an interactive dialog using a trigger ID provided by a slash command, or some other action payload. See https://docs.mattermost.com/developer/interactive-dialogs.html for more information on interactive dialogs.\n__Minimum server version: 5.6__",
  input: CreateActionsDialogsOpenInput,
  output: CreateActionsDialogsOpenOutput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/actions/dialogs/open", data) as any
  },
})
