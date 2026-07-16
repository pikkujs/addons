// Workflow schemes — This resource represents workflow schemes. Use it to manage workflow schemes and the workflow scheme's workflows and issue types. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. When an active workflow scheme is edited, a draft copy of the scheme is created. The draft workflow scheme is then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteWorkflowSchemeInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*."),
})

export const DeleteWorkflowSchemeOutput = z.unknown()

export const deleteWorkflowScheme = pikkuSessionlessFunc({
  description: "Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at least one project).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteWorkflowSchemeInput,
  output: DeleteWorkflowSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/workflowscheme/{id}", data) as any
  },
})
