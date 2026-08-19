// UI modifications (apps) — UI modifications is an experimental feature available for **Forge apps only**. It enables Forge apps to control how selected Jira fields behave on global create issue dialog. For example: hide specific fields, set them as required, etc.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteUiModificationInput = z.object({
  uiModificationId: z.string().describe("The ID of the UI modification."),
})

export const DeleteUiModificationOutput = z.unknown()

export const deleteUiModification = pikkuSessionlessFunc({
  description: "Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can only be deleted by Forge apps.\n\n**[Permissions](#permissions) required:** None.",
  input: DeleteUiModificationInput,
  output: DeleteUiModificationOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/uiModifications/{uiModificationId}", data) as any
  },
})
