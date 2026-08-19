// Screen tab fields — This resource represents the screen tab fields used to record issue details. Use it to get, add, move, and remove fields from screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const RemoveScreenTabFieldInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
  id: z.string().describe("The ID of the field."),
})

export const removeScreenTabField = pikkuSessionlessFunc({
  description: "Removes a field from a screen tab.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: RemoveScreenTabFieldInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}", data)
  },
})
