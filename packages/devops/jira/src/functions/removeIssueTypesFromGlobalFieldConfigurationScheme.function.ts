// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const RemoveIssueTypesFromGlobalFieldConfigurationSchemeInput = z.object({
  id: z.number().int().describe("The ID of the field configuration scheme."),
  issueTypeIds: z.array(z.string()).describe("The list of issue type IDs. Must contain unique values not longer than 255 characters and not be empty. Maximum of 100 IDs."),
})

export const RemoveIssueTypesFromGlobalFieldConfigurationSchemeOutput = z.unknown()

export const removeIssueTypesFromGlobalFieldConfigurationScheme = pikkuSessionlessFunc({
  description: "Removes issue types from the field configuration scheme.\n\nThis operation can only modify field configuration schemes used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: RemoveIssueTypesFromGlobalFieldConfigurationSchemeInput,
  output: RemoveIssueTypesFromGlobalFieldConfigurationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/fieldconfigurationscheme/{id}/mapping/delete", data) as any
  },
})
