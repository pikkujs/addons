// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const CreateLogsInput = z.object({
  level: z.string().describe("The error level, ERROR or DEBUG"),
  message: z.string().describe("Message to send to the server logs"),
})

export const CreateLogsOutput = z.record(z.string(), z.unknown())

export const createLogs = pikkuSessionlessFunc({
  description: "Add log messages to the server logs.\n##### Permissions\nUsers with `manage_system` permission can log ERROR or DEBUG messages.\nLogged in users can log ERROR or DEBUG messages when `ServiceSettings.EnableDeveloper` is `true` or just DEBUG messages when `false`.\nNon-logged in users can log ERROR or DEBUG messages when `ServiceSettings.EnableDeveloper` is `true` and cannot log when `false`.",
  input: CreateLogsInput,
  output: CreateLogsOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/logs", data) as any
  },
})
