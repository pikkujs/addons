// Screens — This resource represents the screens used to record issue details. Use it to: * get details of all screens. * get details of all the fields available for use on screens. * create screens. * delete screens. * update screens. * add a field to the default screen.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AddFieldToDefaultScreenInput = z.object({
  fieldId: z.string().describe("The ID of the field."),
})

export const AddFieldToDefaultScreenOutput = z.unknown()

export const addFieldToDefaultScreen = pikkuSessionlessFunc({
  description: "Adds a field to the default tab of the default screen.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AddFieldToDefaultScreenInput,
  output: AddFieldToDefaultScreenOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/screens/addToDefault/{fieldId}", data) as any
  },
})
