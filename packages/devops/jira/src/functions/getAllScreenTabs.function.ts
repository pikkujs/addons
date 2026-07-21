// Screen tabs — This resource represents the screen tabs used to record issue details. Use it to get, create, update, move, and delete screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAllScreenTabsInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  projectKey: z.string().optional().describe("The key of the project."),
})

export const GetAllScreenTabsOutput = z.array(z.object({
  id: z.number().int().optional().describe("The ID of the screen tab."),
  name: z.string().describe("The name of the screen tab. The maximum length is 255 characters."),
}))

export const getAllScreenTabs = pikkuSessionlessFunc({
  description: "Returns the list of tabs for a screen.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen Scheme.",
  input: GetAllScreenTabsInput,
  output: GetAllScreenTabsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/screens/{screenId}/tabs", data) as any
  },
})
