// Screen tab fields — This resource represents the screen tab fields used to record issue details. Use it to get, add, move, and remove fields from screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const MoveScreenTabFieldInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
  id: z.string().describe("The ID of the field."),
  after: z.string().url().optional().describe("The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't provided."),
  position: z.enum(["Earlier", "Later", "First", "Last"]).optional().describe("The named position to which the screen tab field should be moved. Required if `after` isn't provided."),
})

export const MoveScreenTabFieldOutput = z.unknown()

export const moveScreenTabField = pikkuSessionlessFunc({
  description: "Moves a screen tab field.\n\nIf `after` and `position` are provided in the request, `position` is ignored.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: MoveScreenTabFieldInput,
  output: MoveScreenTabFieldOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}/move", data) as any
  },
})
