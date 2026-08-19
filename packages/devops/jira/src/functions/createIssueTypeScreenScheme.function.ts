// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const CreateIssueTypeScreenSchemeInput = z.object({
  description: z.string().optional().describe("The description of the issue type screen scheme. The maximum length is 255 characters."),
  issueTypeMappings: z.array(z.object({
  issueTypeId: z.string().describe("The ID of the issue type or *default*. Only issue types used in classic projects are accepted. An entry for *default* must be provided and defines the mapping for all issue types without a screen scheme."),
  screenSchemeId: z.string().describe("The ID of the screen scheme. Only screen schemes used in classic projects are accepted."),
})).describe("The IDs of the screen schemes for the issue type IDs and *default*. A *default* entry is required to create an issue type screen scheme, it defines the mapping for all issue types without a screen scheme."),
  name: z.string().describe("The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters."),
})

export const CreateIssueTypeScreenSchemeOutput = z.object({
  id: z.string().describe("The ID of the issue type screen scheme."),
}).describe("The ID of an issue type screen scheme.")

export const createIssueTypeScreenScheme = pikkuSessionlessFunc({
  description: "Creates an issue type screen scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateIssueTypeScreenSchemeInput,
  output: CreateIssueTypeScreenSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issuetypescreenscheme", data) as any
  },
})
