// Screen tab fields — This resource represents the screen tab fields used to record issue details. Use it to get, add, move, and remove fields from screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AddScreenTabFieldInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  tabId: z.number().int().describe("The ID of the screen tab."),
  fieldId: z.string().describe("The ID of the field to add."),
})

export const AddScreenTabFieldOutput = z.object({
  id: z.string().optional().describe("The ID of the screen tab field."),
  name: z.string().optional().describe("The name of the screen tab field. Required on create and update. The maximum length is 255 characters."),
}).describe("A screen tab field.")

export const addScreenTabField = pikkuSessionlessFunc({
  description: "Adds a field to a screen tab.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AddScreenTabFieldInput,
  output: AddScreenTabFieldOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields", data) as any
  },
})
