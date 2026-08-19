// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteIssueTypeScreenSchemeInput = z.object({
  issueTypeScreenSchemeId: z.string().describe("The ID of the issue type screen scheme."),
})

export const DeleteIssueTypeScreenSchemeOutput = z.unknown()

export const deleteIssueTypeScreenScheme = pikkuSessionlessFunc({
  description: "Deletes an issue type screen scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteIssueTypeScreenSchemeInput,
  output: DeleteIssueTypeScreenSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}", data) as any
  },
})
