// Workflow scheme drafts — This resource represents draft workflow schemes. Use it to manage drafts of workflow schemes. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. Editing an active workflow scheme creates a draft copy of the scheme. The draft workflow scheme can then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetDraftWorkflowInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme that the draft belongs to."),
  workflowName: z.string().optional().describe("The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow."),
})

export const GetDraftWorkflowOutput = z.object({
  defaultMapping: z.boolean().optional().describe("Whether the workflow is the default workflow for the workflow scheme."),
  issueTypes: z.array(z.string()).optional().describe("The list of issue type IDs."),
  updateDraftIfNeeded: z.boolean().optional().describe("Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new workflow-issue types mapping. Defaults to `false`."),
  workflow: z.string().optional().describe("The name of the workflow. Optional if updating the workflow-issue types mapping."),
}).describe("Details about the mapping between issue types and a workflow.")

export const getDraftWorkflow = pikkuSessionlessFunc({
  description: "Returns the workflow-issue type mappings for a workflow scheme's draft.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetDraftWorkflowInput,
  output: GetDraftWorkflowOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflowscheme/{id}/draft/workflow", data) as any
  },
})
