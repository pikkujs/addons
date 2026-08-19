// Workflow scheme drafts — This resource represents draft workflow schemes. Use it to manage drafts of workflow schemes. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. Editing an active workflow scheme creates a draft copy of the scheme. The draft workflow scheme can then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetDraftDefaultWorkflowInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme that the draft belongs to."),
})

export const GetDraftDefaultWorkflowOutput = z.object({
  updateDraftIfNeeded: z.boolean().optional().describe("Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new default workflow. Defaults to `false`."),
  workflow: z.string().describe("The name of the workflow to set as the default workflow."),
}).describe("Details about the default workflow.")

export const getDraftDefaultWorkflow = pikkuSessionlessFunc({
  description: "Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned any issue types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed in its issue types for the workflow scheme in Jira.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetDraftDefaultWorkflowInput,
  output: GetDraftDefaultWorkflowOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflowscheme/{id}/draft/default", data) as any
  },
})
