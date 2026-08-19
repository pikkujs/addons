// Screen tab fields — This resource represents the screen tab fields used to record issue details. Use it to get, add, move, and remove fields from screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAllScreenTabFieldsInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
  projectKey: z.string().optional().describe("The key of the project."),
})

export const GetAllScreenTabFieldsOutput = z.array(z.object({
  id: z.string().optional().describe("The ID of the screen tab field."),
  name: z.string().optional().describe("The name of the screen tab field. Required on create and update. The maximum length is 255 characters."),
}))

export const getAllScreenTabFields = pikkuSessionlessFunc({
  description: "Returns all fields for a screen tab.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen Scheme.",
  input: GetAllScreenTabFieldsInput,
  output: GetAllScreenTabFieldsOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields", data) as any
  },
})
