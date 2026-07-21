// Screen tabs — This resource represents the screen tabs used to record issue details. Use it to get, create, update, move, and delete screen tabs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AddScreenTabInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
  name: z.string().describe("The name of the screen tab. The maximum length is 255 characters."),
})

export const AddScreenTabOutput = z.object({
  id: z.number().int().optional().describe("The ID of the screen tab."),
  name: z.string().describe("The name of the screen tab. The maximum length is 255 characters."),
}).describe("A screen tab.")

export const addScreenTab = pikkuSessionlessFunc({
  description: "Creates a tab for a screen.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AddScreenTabInput,
  output: AddScreenTabOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/screens/{screenId}/tabs", data) as any
  },
})
