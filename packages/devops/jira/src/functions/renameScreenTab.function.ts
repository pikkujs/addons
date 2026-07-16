// Screen tabs — This resource represents the screen tabs used to record issue details. Use it to get, create, update, move, and delete screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const RenameScreenTabInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
  name: z.string().describe("The name of the screen tab. The maximum length is 255 characters."),
})

export const RenameScreenTabOutput = z.object({
  id: z.number().int().optional().describe("The ID of the screen tab."),
  name: z.string().describe("The name of the screen tab. The maximum length is 255 characters."),
}).describe("A screen tab.")

export const renameScreenTab = pikkuSessionlessFunc({
  description: "Updates the name of a screen tab.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: RenameScreenTabInput,
  output: RenameScreenTabOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/screens/{screenId}/tabs/{tabId}", data) as any
  },
})
