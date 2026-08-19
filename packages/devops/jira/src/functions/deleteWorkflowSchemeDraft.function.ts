// Workflow scheme drafts — This resource represents draft workflow schemes. Use it to manage drafts of workflow schemes. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. Editing an active workflow scheme creates a draft copy of the scheme. The draft workflow scheme can then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteWorkflowSchemeDraftInput = z.object({
  id: z.number().int().describe("The ID of the active workflow scheme that the draft was created from."),
})

export const deleteWorkflowSchemeDraft = pikkuSessionlessFunc({
  description: "Deletes a draft workflow scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteWorkflowSchemeDraftInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/workflowscheme/{id}/draft", data)
  },
})
