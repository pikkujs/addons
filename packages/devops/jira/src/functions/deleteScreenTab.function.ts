// Screen tabs — This resource represents the screen tabs used to record issue details. Use it to get, create, update, move, and delete screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteScreenTabInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
})

export const deleteScreenTab = pikkuSessionlessFunc({
  description: "Deletes a screen tab.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteScreenTabInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/screens/{screenId}/tabs/{tabId}", data)
  },
})
