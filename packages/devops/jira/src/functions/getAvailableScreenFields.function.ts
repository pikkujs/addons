// Screens — This resource represents the screens used to record issue details. Use it to: * get details of all screens. * get details of all the fields available for use on screens. * create screens. * delete screens. * update screens. * add a field to the default screen.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAvailableScreenFieldsInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
})

export const GetAvailableScreenFieldsOutput = z.array(z.object({
  id: z.string().optional().describe("The ID of the screen tab field."),
  name: z.string().optional().describe("The name of the screen tab field. Required on create and update. The maximum length is 255 characters."),
}))

export const getAvailableScreenFields = pikkuSessionlessFunc({
  description: "Returns the fields that can be added to a tab on a screen.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAvailableScreenFieldsInput,
  output: GetAvailableScreenFieldsOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/screens/{screenId}/availableFields", data) as any
  },
})
