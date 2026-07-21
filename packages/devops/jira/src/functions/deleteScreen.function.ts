// Screens — This resource represents the screens used to record issue details. Use it to: * get details of all screens. * get details of all the fields available for use on screens. * create screens. * delete screens. * update screens. * add a field to the default screen.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteScreenInput = z.object({
  screenId: z.number().int().describe("The ID of the screen."),
})

export const deleteScreen = pikkuSessionlessFunc({
  description: "Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.\n\nOnly screens used in classic projects can be deleted.",
  input: DeleteScreenInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/screens/{screenId}", data)
  },
})
