// UI modifications (apps) — UI modifications is an experimental feature available for **Forge apps only**. It enables Forge apps to control how selected Jira fields behave on global create issue dialog. For example: hide specific fields, set them as required, etc.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateUiModificationInput = z.object({
  uiModificationId: z.string().describe("The ID of the UI modification."),
  contexts: z.array(z.object({
  id: z.string().optional().describe("The ID of the UI modification context."),
  isAvailable: z.boolean().optional().describe("Whether a context is available. For example, when a project is deleted the context becomes unavailable."),
  issueTypeId: z.string().describe("The issue type ID of the context."),
  projectId: z.string().describe("The project ID of the context."),
  viewType: z.string().describe("The view type of the context. Only `GIC` (Global Issue Create) is supported."),
})).optional().describe("List of contexts of the UI modification. The maximum number of contexts is 1000. If provided, replaces all existing contexts."),
  data: z.string().optional().describe("The data of the UI modification. The maximum size of the data is 50000 characters."),
  description: z.string().optional().describe("The description of the UI modification. The maximum length is 255 characters."),
  name: z.string().optional().describe("The name of the UI modification. The maximum length is 255 characters."),
})

export const UpdateUiModificationOutput = z.unknown()

export const updateUiModification = pikkuSessionlessFunc({
  description: "Updates a UI modification. UI modification can only be updated by Forge apps.\n\nEach UI modification can define up to 1000 contexts.\n\n**[Permissions](#permissions) required:**\n\n *  *None* if the UI modification is created without contexts.\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the UI modification is created with contexts.",
  input: UpdateUiModificationInput,
  output: UpdateUiModificationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/uiModifications/{uiModificationId}", data) as any
  },
})
