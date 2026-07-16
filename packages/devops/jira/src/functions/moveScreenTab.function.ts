// Screen tabs — This resource represents the screen tabs used to record issue details. Use it to get, create, update, move, and delete screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const MoveScreenTabInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
  pos: z.number().int().describe("The position of tab. The base index is 0."),
})

export const MoveScreenTabOutput = z.unknown()

export const moveScreenTab = pikkuSessionlessFunc({
  description: "Moves a screen tab.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: MoveScreenTabInput,
  output: MoveScreenTabOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/screens/{screenId}/tabs/{tabId}/move/{pos}", data) as any
  },
})
