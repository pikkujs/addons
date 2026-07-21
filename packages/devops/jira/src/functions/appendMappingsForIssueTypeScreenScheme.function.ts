// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const AppendMappingsForIssueTypeScreenSchemeInput = z.object({
  issueTypeScreenSchemeId: z.string().describe("The ID of the issue type screen scheme."),
  issueTypeMappings: z.array(z.object({
  issueTypeId: z.string().describe("The ID of the issue type or *default*. Only issue types used in classic projects are accepted. An entry for *default* must be provided and defines the mapping for all issue types without a screen scheme."),
  screenSchemeId: z.string().describe("The ID of the screen scheme. Only screen schemes used in classic projects are accepted."),
})).describe("The list of issue type to screen scheme mappings. A *default* entry cannot be specified because a default entry is added when an issue type screen scheme is created."),
})

export const AppendMappingsForIssueTypeScreenSchemeOutput = z.unknown()

export const appendMappingsForIssueTypeScreenScheme = pikkuSessionlessFunc({
  description: "Appends issue type to screen scheme mappings to an issue type screen scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AppendMappingsForIssueTypeScreenSchemeInput,
  output: AppendMappingsForIssueTypeScreenSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping", data) as any
  },
})
