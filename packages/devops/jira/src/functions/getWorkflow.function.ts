// Workflow schemes — This resource represents workflow schemes. Use it to manage workflow schemes and the workflow scheme's workflows and issue types. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. When an active workflow scheme is edited, a draft copy of the scheme is created. The draft workflow scheme is then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetWorkflowInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme."),
  workflowName: z.string().optional().describe("The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow."),
  returnDraftIfExists: z.boolean().optional().default(false).describe("Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned."),
})

export const GetWorkflowOutput = z.object({
  defaultMapping: z.boolean().optional().describe("Whether the workflow is the default workflow for the workflow scheme."),
  issueTypes: z.array(z.string()).optional().describe("The list of issue type IDs."),
  updateDraftIfNeeded: z.boolean().optional().describe("Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new workflow-issue types mapping. Defaults to `false`."),
  workflow: z.string().optional().describe("The name of the workflow. Optional if updating the workflow-issue types mapping."),
}).describe("Details about the mapping between issue types and a workflow.")

export const getWorkflow = pikkuSessionlessFunc({
  description: "Returns the workflow-issue type mappings for a workflow scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetWorkflowInput,
  output: GetWorkflowOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflowscheme/{id}/workflow", data) as any
  },
})
